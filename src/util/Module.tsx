import React from 'react';
import { Router, Route } from 'react-router-dom';
import Navbar from '../components/Navbar';
import history from '../history';
import RestClient from '../RestClient';
import MainBox from '../components/MainBox';
import ErrorMessage from '../components/ErrorMessage';
import { redirect } from './Util';
import { Restaurant } from '../models/Restaurant';
import { Meal } from '../models/Meal';
import { Staff } from '../models/Staff';

type RefData = {
  [index: string]: React.RefObject<HTMLInputElement | HTMLTextAreaElement>;
};

type ModuleProps = { match: { path: string }; location?: { pathname: string } };

const apiKeys: { [index: string]: string } = {
  menu: 'meal',
  restaurants: 'restaurant',
  staff: 'staff'
};

export default class Module<
  T extends Meal | Staff | Restaurant
> extends React.Component<ModuleProps, { id: number; cached: T[] | null }> {
  private section: string;

  private renderSingle: (item: T) => JSX.Element;

  private renderAll: (items: T[]) => JSX.Element;

  private renderCreate: () => JSX.Element;

  private apiData: RefData;

  state = {
    id: 0,
    cached: null as null | T[]
  };

  constructor(
    props: ModuleProps,
    {
      renderSingle,
      renderAll,
      renderCreate,
      apiData
    }: {
      renderSingle: (item: T) => JSX.Element;
      renderAll: (items: T[]) => JSX.Element;
      renderCreate: () => JSX.Element;
      apiData: RefData;
    }
  ) {
    super(props);
    this.section = props.match.path.slice(1);
    this.renderSingle = renderSingle;
    this.renderAll = renderAll;
    this.renderCreate = renderCreate;
    this.apiData = apiData;
  }

  private normaliseData(data: RefData) {
    return Object.entries(data).reduce(
      (data: { [index: string]: string }, [key, ref]) => {
        data[key] = ref.current?.value!;
        return data;
      },
      {}
    );
  }

  fetch = () => {
    const {
      state: { cached }
    } = this;
    if (!cached || !cached.length) {
      RestClient.get<T[]>(`${this.section}/`)
        .then(({ result }) => this.setState({ cached: result || [] }))
        .catch(err => {
          console.error(err);
          this.setState({ cached: [] });
        });
    }
    return this.state.cached;
  };

  create = () => {
    RestClient.create<T>(`/${this.section}/`, this.normaliseData(this.apiData));
  };

  update = (id: number) => {
    RestClient.update<T>(
      `/${this.section}/${id}`,
      this.normaliseData(this.apiData)
    );
  };

  delete = (id: number) => {
    RestClient.del<T>(`/${this.section}/${id}`);
  };

  renderLoadError() {
    const cached = this.fetch();
    if (!cached) {
      return (
        <div className="pageloader is-active">
          <span className="title">Loading</span>
        </div>
      );
    }
    if (!cached.length) {
      return (
        <Router history={history}>
          <MainBox>
            <ErrorMessage action={`fetch the ${this.section}`} />
          </MainBox>
        </Router>
      );
    }
    return null;
  }

  handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter')
      redirect(`${this.section}/find/${this.state.id}`);
  };

  find = (): JSX.Element => {
    if (this.props.location?.pathname.split('/').length === 4) {
      const loadingOrError = this.renderLoadError();
      if (loadingOrError) return loadingOrError;
      return (
        <MainBox>
          <Route
            path={`/${this.section}/find/:id`}
            render={(props: { match: { params: { id: string } } }) => {
              const id = Number(props.match.params.id);
              if (!id) return this.renderAll(this.fetch()!);
              console.log(this.state.cached, this.section, id);

              const found = this.state.cached?.find(
                item => item[`${apiKeys[this.section]}_id`] === Number(id)
              );
              if (!found)
                return (
                  <ErrorMessage
                    action={`find a ${this.section} with the ID of ${id}`}
                  />
                );
              return (
                <Router history={history}>
                  <div
                    className="container"
                    style={{
                      width: 'calc(100vh - 120px)',
                      top: 'calc(100vh - 610px)'
                    }}
                  >
                    {this.renderSingle(found)}
                    <div className="field is-grouped is-grouped-right">
                      <p className="control">
                        <button
                          className="button is-success"
                          onClick={() => this.update(id)}
                        >
                          <span className="icon is-small">
                            <i className="fas fa-check"></i>
                          </span>
                          <span>Save</span>
                        </button>
                      </p>
                      <p className="control">
                        <button
                          className="button is-danger"
                          onClick={() => this.delete(id)}
                        >
                          <span>Delete</span>
                          <span className="icon is-small">
                            <i className="fas fa-times"></i>
                          </span>
                        </button>
                      </p>
                      <p className="control">
                        {/* TODO: Reset fields onClick */}
                        <a className="button is-light">Reset</a>
                      </p>
                    </div>
                  </div>
                </Router>
              );
            }}
          />
        </MainBox>
      );
    }
    return (
      <MainBox>
        <div>
          <div
            className="field has-addons"
            style={{
              justifyContent: 'center',
              height: '77vh',
              display: 'flex',
              alignItems: 'center'
            }}
          >
            <div className="control">
              <input
                className="input"
                type="text"
                placeholder={`Enter the ${this.section}'s ID`}
                onChange={(evt: React.ChangeEvent<HTMLInputElement>) =>
                  this.setState({ id: Number(evt.target.value) })
                }
                onKeyPress={this.handleKeyPress}
              />
            </div>
            <div className="control">
              <a
                className="button is-info"
                onClick={() =>
                  redirect(`${this.section}/find/${this.state.id}`)
                }
              >
                Find
              </a>
            </div>
            <div className="control">
              <a
                className="button is-primary"
                onClick={() => redirect(`${this.section}/find/all`)}
              >
                View all
              </a>
            </div>
          </div>
        </div>
      </MainBox>
    );
  };

  view = () => {
    const loadingOrError = this.renderLoadError();
    if (loadingOrError) return loadingOrError;
    return (
      <Router history={history}>
        <MainBox>{this.renderAll(this.fetch()!)}</MainBox>
      </Router>
    );
  };

  render() {
    return (
      <Router history={history}>
        <Navbar />
        <Route path={`/${this.section}/find`} render={this.find} />
        <Route path={`/${this.section}/view`} render={this.view} />
        <Route
          path={`/${this.section}/create`}
          render={() => (
            <Router history={history}>
              <MainBox>
                <div
                  className="container"
                  style={{
                    width: 'calc(100vh - 120px)',
                    position: 'relative',
                    top: '50%',
                    transform: 'translateY(-50%)'
                  }}
                >
                  {this.renderCreate()}
                  <div className="field is-grouped is-grouped-right">
                    <p className="control">
                      <button
                        className="button is-success"
                        onClick={this.create}
                      >
                        <span className="icon is-small">
                          <i className="fas fa-plus-circle"></i>
                        </span>
                        <span>Create</span>
                      </button>
                    </p>
                    <p className="control">
                      {/* TODO: Reset fields onClick */}
                      <a className="button is-light">Clear</a>
                    </p>
                  </div>
                </div>
              </MainBox>
            </Router>
          )}
        />
      </Router>
    );
  }
}
