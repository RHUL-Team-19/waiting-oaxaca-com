/* eslint-disable @typescript-eslint/camelcase */
import React from 'react';
import Module from '../util/Module';
import { Router, Route } from 'react-router-dom';
import MainBox from '../components/MainBox';
import history from '../history';
import { redirect } from '../util/Util';

// TODO: Render each field from the model in a container
const renderAll = () => <h1>rendering all</h1>;

// TODO: List of scrollable list that can be clicked to expand more details
const renderSingle = (props: {
  match: { params: { staff_id: number | string } };
}) => <h1>rendering {props.match.params.staff_id}</h1>;

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
        {/* TODO: Fetch the staff from the API, add sort buttons */}
      </Router>
    );
  }

  create() {
    return (
      <Router history={history}>
        <MainBox>
          {/* TODO: Display a form that has input fields for all fields on the Staff model */}
        </MainBox>
      </Router>
    );
  }
}
