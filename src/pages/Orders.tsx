/* eslint-disable react/display-name, @typescript-eslint/camelcase, react/prop-types */
import React from 'react';
import { redirect, cardColours } from '../util/Util';
import Module from '../util/Module';
import { Order } from '../models/Order';
const staffRef = React.createRef<HTMLInputElement>();
const tableRef = React.createRef<HTMLInputElement>();
const paidRef = React.createRef<HTMLInputElement>();
const ratingRef = React.createRef<HTMLInputElement>();

export default class Orders extends Module<Order> {
  constructor(props: { match: { path: string } }) {
    super(props, {
      apiData: {
        staff_id: staffRef,
        table_id: tableRef,
        is_paid: paidRef,
        satisfaction_rating: ratingRef
      },
      renderAll: (orders: Order[]) => (
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
          {orders.map(({ order_id }, i) => {
            return (
              <div
                className="column is-one-fifth"
                key={i}
                style={{ padding: '1vw' }}
              >
                <article
                  className={`tile is-child notification ${
                    cardColours[i % cardColours.length]
                  }`}
                >
                  <p className="title">{order_id}</p>
                  <button
                    className="button is-warning is-small"
                    onClick={() => redirect(`order/find/${order_id}`)}
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
      ),

      renderSingle: ({
        order_id,
        staff_id,
        table_id,
        is_paid,
        satisfaction_rating
      }: Order) => {
        return (
          <div>
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
                      placeholder={order_id.toString()}
                      disabled
                    />
                  </p>
                </div>
              </div>
            </div>

            <div className="field is-horizontal">
              <div className="field-label is-normal">
                <label className="label">Created by</label>
              </div>
              <div className="field-body">
                <div className="field">
                  <p className="control">
                    <input
                      defaultValue={staff_id}
                      className="input"
                      type="text"
                      ref={staffRef}
                    />
                  </p>
                </div>
              </div>
            </div>

            <div className="field is-horizontal">
              <div className="field-label is-normal">
                <label className="label">Table</label>
              </div>
              <div className="field-body">
                <div className="field">
                  <p className="control">
                    <input
                      defaultValue={table_id}
                      className="input"
                      type="text"
                      ref={tableRef}
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
                      checked={is_paid}
                    />
                    <label htmlFor="switchColorDefault"></label>
                  </div>
                </div>
              </div>
            </div>

            {typeof satisfaction_rating !== 'undefined' ? (
              <div className="field is-horizontal">
                <div className="field-label is-normal">
                  <label className="label">Rating</label>
                </div>
                <div className="field-body">
                  <div className="field">
                    <p className="control">
                      <input
                        defaultValue={satisfaction_rating}
                        className="input"
                        type="text"
                        ref={ratingRef}
                      />
                    </p>
                  </div>
                </div>
              </div>
            ) : null}
          </div>
        );
      },

      renderCreate: () => {
        return (
          <div>
            <div className="field is-horizontal">
              <div className="field-label is-normal">
                {/* TODO: Infer Staff ID from logged in credentials */}
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
                      ref={staffRef}
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
                      ref={tableRef}
                    />
                  </p>
                </div>
              </div>
            </div>

            {/* TODO: Create a container to hold Meal[] */}
          </div>
        );
      }
    });
  }
}
