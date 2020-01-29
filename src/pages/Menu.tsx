/* eslint-disable @typescript-eslint/camelcase */
import React from 'react';
import Module from '../util/Module';
import MainBox from '../components/MainBox';
import { Route, Router } from 'react-router-dom';
import { redirect } from '../util/Util';
import history from '../history';

// TODO: Render each field from the model in a container
const renderSingle = (props: { match: { params: { meal_id: number } } }) => (
  <h1>rendering {props.match.params.meal_id}</h1>
);

// TODO: List of scrollable list that can be clicked to expand more details
const renderAll = () => <h1>rendering all</h1>;

export default class Menu extends Module {
  state = { meal_id: 'all' };

  constructor(props: { match: { path: string } }) {
    super(props);
  }

  find = () => {
    if (this.props.location.pathname.split('/').length === 4) {
      return (
        <MainBox>
          <Route path="/menu/find/:meal_id" render={renderSingle} />
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
                    this.setState({ meal_id: evt.target.value })
                  }
                />
              </div>
              <div className="control">
                <a
                  className="button is-info"
                  onClick={() => redirect(`menu/find/${this.state.meal_id}`)}
                >
                  Find
                </a>
              </div>
              <div className="control">
                <a
                  className="button is-primary"
                  onClick={() => redirect('menu/find/all')}
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

  view() {
    return (
      <Router history={history}>
        {/* TODO: Fetch the menu from the API, add sort buttons */}
      </Router>
    );
  }

  create() {
    return (
      <Router history={history}>
        <MainBox>
          {/* TODO: Display a form that has input fields for all fields on the Menu model */}
        </MainBox>
      </Router>
    );
  }
}
