/* eslint-disable @typescript-eslint/camelcase */
import React from 'react';
import Module from '../util/Module';
import { Router, Route } from 'react-router-dom';
import MainBox from '../components/MainBox';
import history from '../history';
import { redirect } from '../util/Util';
import { Restaurant } from '../models/Restaurant';
import RestClient from '../RestClient';
import ErrorMessage from '../components/ErrorMessage';

const colours = [
  'is-primary',
  'is-link',
  'is-info',
  'is-success',
  'is-warning',
  'is-danger'
];
const nameRef = React.createRef<HTMLInputElement>();
const telephoneRef = React.createRef<HTMLInputElement>();
const locationRef = React.createRef<HTMLTextAreaElement>();

let cachedRestaurants: Restaurant[] | null = null;

// TODO: Handle responses returned from the API.

const createRestaurant = () =>
  RestClient.create<Restaurant>('/restaurants/', {
    name: nameRef.current?.value,
    location: locationRef.current?.value,
    telephone_number: telephoneRef.current?.value
  });

const updateRestaurant = (id: number) =>
  RestClient.update<Restaurant>(`/restaurants/${id}/`, {
    name: nameRef.current?.value,
    location: locationRef.current?.value,
    telephone_number: telephoneRef.current?.value
  });

const deleteRestaurant = (id: number) =>
  RestClient.del<Restaurant>(`/restaurants/${id}/`);

const renderAll = () => (
  <div
    className="columns is-multiline is-vcentered"
    style={{
      textAlign: 'center',
      justifyContent: 'center',
      padding: '2vw',
      position: 'relative',
      top: '50%',
      transform: 'translateY(-50%)'
    }}
  >
    {cachedRestaurants?.map(({ restaurant_id, name }, i) => {
      return (
        <div className="column is-one-fifth" key={i} style={{ padding: '1vw' }}>
          <article
            className={`tile is-child notification ${
              colours[i % colours.length]
            }`}
          >
            <p className="title">{restaurant_id}</p>
            <p className="subtitle">{name}</p>
            <button
              className="button is-warning is-small"
              onClick={() => redirect(`restaurants/find/${restaurant_id}`)}
            >
              <span className="icon is-small">
                <i className="fas fa-edit"></i>
              </span>
              <span>Edit</span>
            </button>
          </article>
        </div>
      );
    })}
  </div>
);

const renderSingle = (props: {
  match: { params: { restaurant_id: string } };
}) => {
  const id = Number(props.match.params.restaurant_id);
  if (!id) return renderAll();
  const restaurant = cachedRestaurants?.find(
    ({ restaurant_id }) => restaurant_id === Number(id)
  );
  if (!restaurant)
    return <ErrorMessage action={`find a restaurant with the ID of ${id}`} />;
  return (
    <Router history={history}>
      <div
        className="container"
        style={{
          width: 'calc(100vh - 120px)',
          top: 'calc(100vh - 610px)'
        }}
      >
        <div className="field is-horizontal">
          <div className="field-label is-normal">
            <label className="label">ID</label>
          </div>
          <div className="field-body">
            <div className="field">
              <p className="control">
                <input
                  className="input"
                  type="text"
                  placeholder={props.match.params.restaurant_id.toString()}
                  disabled
                />
              </p>
            </div>
          </div>
        </div>

        <div className="field is-horizontal">
          <div className="field-label is-normal">
            <label className="label">Name</label>
          </div>
          <div className="field-body">
            <div className="field">
              <p className="control">
                <input
                  defaultValue={restaurant?.name}
                  className="input"
                  type="text"
                  ref={nameRef}
                />
              </p>
            </div>
          </div>
        </div>

        <div className="field is-horizontal">
          <div className="field-label is-normal">
            <label className="label">Telephone number</label>
          </div>
          <div className="field-body">
            <div className="field">
              <div className="field has-addons">
                <p className="control">
                  <a className="button is-static">+44</a>
                </p>
                <p className="control">
                  <input
                    defaultValue={restaurant?.telephone_number}
                    className="input"
                    type="tel"
                    placeholder="Restaurant phone number"
                    ref={telephoneRef}
                  />
                </p>
              </div>
              <p className="help">Do not enter the first zero</p>
            </div>
          </div>
        </div>

        <div className="field is-horizontal">
          <div className="field-label is-normal">
            <label className="label">Location</label>
          </div>
          <div className="field-body">
            <div className="field">
              <div className="control">
                <textarea
                  defaultValue={restaurant?.location}
                  className="textarea"
                  ref={locationRef}
                ></textarea>
              </div>
            </div>
          </div>
        </div>

        <div className="field is-grouped is-grouped-right">
          <p className="control">
            <button
              className="button is-success"
              onClick={() => updateRestaurant(id)}
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
              onClick={() => deleteRestaurant(id)}
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
};

export default class Restaurants extends Module {
  state = {
    restaurant_id: 0,
    restaurants: null as Restaurant[] | null
  };

  fetchRestaurants = () => {
    const {
      state: { restaurants }
    } = this;
    if (!restaurants || !restaurants.length) {
      RestClient.get<Restaurant[]>('/restaurants/')
        .then(({ result }) => {
          result = result || [];
          cachedRestaurants = result;
          this.setState({ restaurants: result });
        })
        .catch(err => {
          console.error(err);
          cachedRestaurants = [];
          this.setState({ restaurants: [] });
        });
    }
    return this.state.restaurants;
  };

  renderLoadError() {
    const restaurants = this.fetchRestaurants();
    if (!restaurants) {
      return (
        <div className="pageloader is-active">
          <span className="title">Loading</span>
        </div>
      );
    }
    if (!restaurants.length) {
      return (
        <Router history={history}>
          <MainBox>
            <ErrorMessage action="fetch the restaurants" />
          </MainBox>
        </Router>
      );
    }
    return null;
  }

  handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter')
      redirect(`restaurants/find/${this.state.restaurant_id}`);
  };

  constructor(props: { match: { path: string } }) {
    super(props);
  }

  find = () => {
    if (this.props.location.pathname.split('/').length === 4) {
      const loadingOrError = this.renderLoadError();
      if (loadingOrError) return loadingOrError;
      return (
        <MainBox>
          <Route
            path="/restaurants/find/:restaurant_id"
            render={renderSingle}
          />
        </MainBox>
      );
    }
    return (
      <Router history={history}>
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
                  placeholder="Enter the restaurant's ID"
                  onChange={(evt: React.ChangeEvent<HTMLInputElement>) =>
                    this.setState({ restaurant_id: evt.target.value })
                  }
                  onKeyPress={this.handleKeyPress}
                />
              </div>
              <div className="control">
                <a
                  className="button is-info"
                  onClick={() =>
                    redirect(`restaurants/find/${this.state.restaurant_id}`)
                  }
                >
                  Find
                </a>
              </div>
              <div className="control">
                <a
                  className="button is-primary"
                  onClick={() => redirect('restaurants/find/all')}
                >
                  View all
                </a>
              </div>
            </div>
          </div>
        </MainBox>
      </Router>
    );
  };

  view = () => {
    const loadingOrError = this.renderLoadError();
    if (loadingOrError) return loadingOrError;
    return (
      <Router history={history}>
        <MainBox>{renderAll()}</MainBox>
      </Router>
    );
  };

  create() {
    return (
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
            <div className="field is-horizontal">
              <div className="field-label is-normal">
                <label className="label">Name</label>
              </div>
              <div className="field-body">
                <div className="field">
                  <p className="control">
                    <input
                      placeholder="Enter the restaurant's name"
                      className="input"
                      type="text"
                      ref={nameRef}
                    />
                  </p>
                </div>
              </div>
            </div>

            <div className="field is-horizontal">
              <div className="field-label is-normal">
                <label className="label">Telephone number</label>
              </div>
              <div className="field-body">
                <div className="field">
                  <div className="field has-addons">
                    <p className="control">
                      <a className="button is-static">+44</a>
                    </p>
                    <p className="control">
                      <input
                        className="input"
                        type="tel"
                        placeholder="Enter the restaurant's phone number"
                        ref={telephoneRef}
                      />
                    </p>
                  </div>
                  <p className="help">Do not enter the first zero</p>
                </div>
              </div>
            </div>

            <div className="field is-horizontal">
              <div className="field-label is-normal">
                <label className="label">Location</label>
              </div>
              <div className="field-body">
                <div className="field">
                  <div className="control">
                    <textarea
                      placeholder="Enter the restaurant's location"
                      className="textarea"
                      ref={locationRef}
                    ></textarea>
                  </div>
                </div>
              </div>
            </div>

            <div className="field is-grouped is-grouped-right">
              <p className="control">
                <button
                  className="button is-success"
                  onClick={createRestaurant}
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
    );
  }
}
