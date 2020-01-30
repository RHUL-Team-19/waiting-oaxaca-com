/* eslint-disable @typescript-eslint/camelcase */
import React from 'react';
import Module from '../util/Module';
import { Router, Route } from 'react-router-dom';
import MainBox from '../components/MainBox';
import history from '../history';
import { redirect } from '../util/Util';
import { Staff as StaffModel } from '../models/Staff';

const mockStaff: StaffModel[] = [
  {
    staff_id: 123,
    restaurant_id: 345,
    full_name: 'Jim Bob',
    password: 'Zm9v',
    has_passed_training: true
  }
];

// TODO: Redesign this
const renderAll = () => (
  <table className="table is-fullwidth">
    <thead>
      <tr>
        <th>ID</th>
        <th>Restaurant ID</th>
        <th>Name</th>
      </tr>
    </thead>

    {mockStaff.map(({ staff_id, restaurant_id, full_name }) => {
      return (
        <tbody key={staff_id}>
          <tr>
            <th>{staff_id}</th>
            <th>{restaurant_id}</th>
            <td>{full_name}</td>
            <td>
              <button
                className="button is-warning is-small"
                onClick={() => redirect(`staff/find/${staff_id}`)}
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
  match: { params: { staff_id: number | string } };
}) => {
  if (props.match.params.staff_id === 'all') return renderAll();
  // TODO: Replace with API get to /staff/:id
  const staff = mockStaff.find(
    ({ staff_id }) => staff_id === Number(props.match.params.staff_id)
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
                  placeholder={props.match.params.staff_id.toString()}
                  disabled
                />
              </p>
            </div>
          </div>
        </div>

        <div className="field is-horizontal">
          <div className="field-label is-normal">
            <label className="label">Restaurant ID</label>
          </div>
          <div className="field-body">
            <div className="field">
              <p className="control">
                <input
                  defaultValue={staff?.restaurant_id}
                  className="input"
                  type="text"
                />
              </p>
            </div>
          </div>
        </div>

        <div className="field is-horizontal">
          <div className="field-label is-normal">
            <label className="label">Full Name</label>
          </div>
          <div className="field-body">
            <div className="field">
              <p className="control">
                <input
                  defaultValue={staff?.full_name}
                  className="input"
                  type="text"
                />
              </p>
            </div>
          </div>
        </div>

        <div className="field is-horizontal">
          <div className="field-label is-normal">
            <label className="label">Password</label>
          </div>
          <div className="field-body">
            <div className="field">
              <p className="control">
                <input
                  defaultValue={atob(staff!.password)}
                  className="input"
                  type="text"
                />
              </p>
            </div>
          </div>
        </div>

        <div className="field is-horizontal">
          <div className="field-label is-normal">
            <label className="label">Passed training</label>
          </div>
          <div className="field-body">
            <div className="field">
              <div className="field">
                <input
                  id="switchColorDefault"
                  type="checkbox"
                  name="switchColorDefault"
                  className="switch"
                  checked={staff?.has_passed_training}
                />
                <label htmlFor="switchColorDefault"></label>
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

export default class Staff extends Module {
  state = { staff_id: 'all' };

  constructor(props: { match: { path: string } }) {
    super(props);
  }

  find = () => {
    if (this.props.location.pathname.split('/').length === 4) {
      return (
        <MainBox>
          <Route path="/staff/find/:staff_id" render={renderSingle} />
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
                  placeholder="Enter the staff's ID"
                  onChange={(evt: React.ChangeEvent<HTMLInputElement>) =>
                    this.setState({ staff_id: evt.target.value })
                  }
                />
              </div>
              <div className="control">
                <a
                  className="button is-info"
                  onClick={() => redirect(`staff/find/${this.state.staff_id}`)}
                >
                  Find
                </a>
              </div>
              <div className="control">
                <a
                  className="button is-primary"
                  onClick={() => redirect('staff/find/all')}
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
                <label className="label">Restaurant ID</label>
              </div>
              <div className="field-body">
                <div className="field">
                  <p className="control">
                    <input
                      placeholder="Enter the restaurant's ID"
                      className="input"
                      type="text"
                    />
                  </p>
                </div>
              </div>
            </div>

            <div className="field is-horizontal">
              <div className="field-label is-normal">
                <label className="label">Full Name</label>
              </div>
              <div className="field-body">
                <div className="field">
                  <p className="control">
                    <input
                      placeholder="Enter the staff's full name"
                      className="input"
                      type="text"
                    />
                  </p>
                </div>
              </div>
            </div>

            <div className="field is-horizontal">
              <div className="field-label is-normal">
                <label className="label">Password</label>
              </div>
              <div className="field-body">
                <div className="field">
                  <p className="control  has-icons-left">
                    <input
                      className="input"
                      type="password"
                      placeholder="Enter the staff's password"
                    />
                    <span className="icon is-small is-left">
                      <i className="fas fa-lock"></i>
                    </span>
                  </p>
                </div>
              </div>
            </div>

            <div className="field is-horizontal">
              <div className="field-label is-normal">
                <label className="label">Passed training</label>
              </div>
              <div className="field-body">
                <div className="field">
                  <input
                    id="switchColorDefault"
                    type="checkbox"
                    name="switchColorDefault"
                    className="switch"
                    checked={false}
                  />
                  <label htmlFor="switchColorDefault"></label>
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
