/* eslint-disable react/display-name, @typescript-eslint/camelcase, react/prop-types */
import React from 'react';
import { redirect, cardColours } from '../util/Util';
import { Staff as StaffModel } from '../models/Staff';
import Module from '../util/Module';

const nameRef = React.createRef<HTMLInputElement>();
const telephoneRef = React.createRef<HTMLInputElement>();
const locationRef = React.createRef<HTMLTextAreaElement>();

export default class Staff extends Module<StaffModel> {
  constructor(props: { match: { path: string } }) {
    super(props, {
      apiData: {
        name: nameRef,
        location: locationRef,
        telephone_number: telephoneRef
      },
      renderAll: (staff: StaffModel[]) => (
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
          {staff.map(({ staff_id, full_name }, i) => {
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
                  <p className="title">{staff_id}</p>
                  <p className="subtitle">{full_name}</p>
                  <button
                    className="button is-warning is-small"
                    onClick={() => redirect(`staff/find/${staff_id}`)}
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
        staff_id,
        restaurant_id,
        full_name,
        password,
        has_passed_training
      }: StaffModel) => {
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
                      placeholder={staff_id.toString()}
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
                      defaultValue={restaurant_id}
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
                      defaultValue={full_name}
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
                      defaultValue={atob(password)}
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
                      checked={has_passed_training}
                    />
                    <label htmlFor="switchColorDefault"></label>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      },

      renderCreate: () => {
        return (
          <div>
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
          </div>
        );
      }
    });
  }
}
