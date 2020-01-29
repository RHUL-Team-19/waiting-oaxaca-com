/* eslint-disable @typescript-eslint/camelcase */
import React from 'react';
import Module from '../util/Module';
import { Router, Route } from 'react-router-dom';
import MainBox from '../components/MainBox';
import history from '../history';
import { redirect } from '../util/Util';
import { Restaurant } from '../models/Restaurant';

const mockRestaurants: Restaurant[] = [
  {
    restaurant_id: 123,
    name: 'oaxaca',
    telephone_number: 123456789,
    location: '123 Some Road\nLondon\nABC 123'
  }
];

// TODO: Redesign this
const renderAll = () => (
  <table className="table is-fullwidth">
    <thead>
      <tr>
        <th>ID</th>
        <th>Name</th>
      </tr>
    </thead>

    {mockRestaurants.map(({ restaurant_id, name }) => {
      return (
        <tbody key={restaurant_id}>
          <tr>
            <th>{restaurant_id}</th>
            <td>{name}</td>
            <td>
              <button
                className="button is-warning is-small"
                onClick={() => redirect(`restaurants/find/${restaurant_id}`)}
              >
                <span className="icon is-small">
                  <i className="fas fa-edit"></i>
                </span>
                <span>Edit</span>
              </button>
            </td>
          </tr>
        </tbody>
      );
    })}
  </table>
);

const renderSingle = (props: {
  match: { params: { restaurant_id: number | string } };
}) => {
  if (props.match.params.restaurant_id === 'all') return renderAll();
  // TODO: Replace with API get to /restaurants/:id
  const restaurant = mockRestaurants.find(
    ({ restaurant_id }) =>
      restaurant_id === Number(props.match.params.restaurant_id)
  );
  // TODO: Handle invalid ids
  return (
    <Router history={history}>
      <div
        className="container"
        style={{
          width: 'calc(100vh - 120px)',
          top: 'calc(100vh - 750px)'
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
                ></textarea>
              </div>
            </div>
          </div>
        </div>

        <div className="field is-grouped is-grouped-right">
          <p className="control">
            {/* TODO: Make API call onClick */}
            <button className="button is-success">
              <span className="icon is-small">
                <i className="fas fa-check"></i>
              </span>
              <span>Save</span>
            </button>
          </p>
          <p className="control">
            {/* TODO: Make API call onClick */}
            <button className="button is-danger">
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
  state = { restaurant_id: 'all' };

  constructor(props: { match: { path: string } }) {
    super(props);
  }

  find = () => {
    if (this.props.location.pathname.split('/').length === 4) {
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
        <MainBox>{renderAll()}</MainBox>
      </Router>
    );
  }

  create() {
    return (
      <Router history={history}>
        <MainBox>
          <div
            className="container"
            style={{
              width: 'calc(100vh - 120px)',
              top: 'calc(100vh - 750px)'
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
                    ></textarea>
                  </div>
                </div>
              </div>
            </div>

            <div className="field is-grouped is-grouped-right">
              <p className="control">
                {/* TODO: Make API call onClick */}
                <button className="button is-success">
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
