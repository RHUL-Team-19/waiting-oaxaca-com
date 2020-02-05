/* eslint-disable @typescript-eslint/camelcase */
import React from 'react';
import Module from '../util/Module';
import { Router, Route } from 'react-router-dom';
import MainBox from '../components/MainBox';
import history from '../history';
import { redirect } from '../util/Util';
import { Order as OrderModel } from '../models/Order';
import { create } from 'domain';

const mockOrder: OrderModel[] = [
    {
      order_id: 456,
      staff_id: 123,
      is_paid: false,
      table_id: 1,
      date_time_ordered: "saturday",
      satisfaction_rating: 5,
    }
  ];

  

// TODO: Redesign this
const renderAll = () => (
    <table className="table is-fullwidth" style={{ marginLeft: '100px' }}>
      <thead>
        <tr>
          <th>Order ID</th>
          <th>Staff ID</th>
          <th>table ID</th>
          <th>Time orderded</th>
        </tr>
      </thead>
  
      {mockOrder.map(({ order_id, staff_id, table_id, date_time_ordered }) => {
        return (
          <tbody key={staff_id}>
            <tr>
              <th>{order_id}</th>
              <th>{staff_id}</th>
              <th>{table_id}</th>
              <td>{date_time_ordered}</td>
              <td>
                <button
                  className="button is-warning is-small"
                  onClick={() => redirect(`order/find/${order_id}`)} //TODO change redirect
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
    match: { params: { order_id: number | string } };
  }) => {
    if (props.match.params.order_id === 'all') return renderAll();
    // TODO: Replace with API get to /order/:id
    const order = mockOrder.find(
      ({ order_id }) => order_id === Number(props.match.params.order_id)
    );
    // TODO: Handle invalid ids
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
              <label className="label">Order ID</label>
            </div>
            <div className="field-body">
              <div className="field">
                <p className="control">
                  <input
                    defaultValue={order?.order_id}
                    className="input"
                    type="text"
                  />
                </p>
              </div>
            </div>
          </div>
  
          <div className="field is-horizontal">
            <div className="field-label is-normal">
              <label className="label">Staff ID</label>
            </div>
            <div className="field-body">
              <div className="field">
                <p className="control">
                  <input
                    defaultValue={order?.staff_id}
                    className="input"
                    type="text"
                  />
                </p>
              </div>
            </div>
          </div>

          <div className="field is-horizontal">
            <div className="field-label is-normal">
              <label className="label">Table ID</label>
            </div>
            <div className="field-body">
              <div className="field">
                <p className="control">
                  <input
                    defaultValue={order?.table_id}
                    className="input"
                    type="text"
                  />
                </p>
              </div>
            </div>
          </div>
  
          <div className="field is-horizontal">
            <div className="field-label is-normal">
              <label className="label">Time Ordered</label>
            </div>
            <div className="field-body">
              <div className="field">
                <p className="control">
                  <input
                    defaultValue={order?.date_time_ordered}
                    className="input"
                    type="text"
                  />
                </p>
              </div>
            </div>
          </div>
  
          <div className="field is-horizontal">
            <div className="field-label is-normal">
              <label className="label">Paid</label>
            </div>
            <div className="field-body">
              <div className="field">
                <div className="field">
                  <input
                    id="switchColorDefault"
                    type="checkbox"
                    name="switchColorDefault"
                    className="switch"
                    checked={order?.is_paid}
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
  
  export default class Order extends Module {
    state = { order_id: 'all' };
  
    constructor(props: { match: { path: string } }) {
      super(props);
    }
  
    find = () => {
      if (this.props.location.pathname.split('/').length === 4) {
        return (
          <MainBox>
            <Route path="/order/find/:order_id" render={renderSingle} />
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
                    placeholder="Enter the order ID"
                    onChange={(evt: React.ChangeEvent<HTMLInputElement>) =>
                      this.setState({ order_id: evt.target.value })
                    }
                  />
                </div>
                <div className="control">
                  <a
                    className="button is-info"
                    onClick={() => redirect(`order/find/${this.state.order_id}`)}
                  >
                    Find
                  </a>
                </div>
                <div className="control">
                  <a
                    className="button is-primary"
                    onClick={() => redirect('order/find/all')}
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
                top: 'calc(100vh - 610px)'
              }}
            >

            <div className="field is-horizontal">
                <div className="field-label is-normal">
                  <label className="label">Staff ID</label>
                </div>
                <div className="field-body">
                  <div className="field">
                    <p className="control">
                      <input
                        placeholder="123"
                        disabled
                        className="input"
                        type="text"
                      />
                    </p>
                  </div>
                </div>
              </div>

              <div className="field is-horizontal">
                <div className="field-label is-normal">
                  <label className="label">Order ID</label>
                </div>
                <div className="field-body">
                  <div className="field">
                    <p className="control">
                      <input
                        placeholder="Enter the order ID"
                        className="input"
                        type="text"
                      />
                    </p>
                  </div>
                </div>
              </div>
  
              <div className="field is-horizontal">
                <div className="field-label is-normal">
                  <label className="label">Table ID</label>
                </div>
                <div className="field-body">
                  <div className="field">
                    <p className="control">
                      <input
                        placeholder="Enter the table ID"
                        className="input"
                        type="text"
                      />
                    </p>
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
  