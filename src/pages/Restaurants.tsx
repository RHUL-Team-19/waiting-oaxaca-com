/* eslint-disable @typescript-eslint/camelcase */
import React from 'react';
import Module from '../util/Module';
import { Router, Route } from 'react-router-dom';
import MainBox from '../components/MainBox';
import history from '../history';
import { redirect } from '../util/Util';

// TODO: Render each field from the model in a container?
const renderSingle = (props: {
  match: { params: { restaurant_id: number } };
}) => <h1>rendering {props.match.params.restaurant_id}</h1>;

// TODO: List of scrollable list that can be clicked to expand more details
const renderAll = () => <h1>rendering all</h1>;

export default class Restaurants extends Module {
  state = { restaurant_id: 'all' };

  constructor() {
    super({ section: 'restaurants' });
  }

  find = () => {
    return (
      <Router history={history}>
        <MainBox>
          <div>
            <Route
              path="/restaurants/find/:restaurant_id"
              render={renderSingle}
            />
            <div
              className="field has-addons"
              style={{
                marginTop: '235px',
                marginLeft: '535px'
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

  view() {
    return (
      <Router history={history}>
        <MainBox>
          {/* TODO: Fetch restaurants from the API, add sort buttons */}
        </MainBox>
      </Router>
    );
  }

  create() {
    return (
      <Router history={history}>
        <MainBox>
          {/* TODO: Display a form that has input fields for all fields on the Restaurants model */}
        </MainBox>
      </Router>
    );
  }
}
