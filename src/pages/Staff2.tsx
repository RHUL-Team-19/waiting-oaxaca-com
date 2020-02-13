/* eslint-disable react/display-name, @typescript-eslint/camelcase, react/prop-types */
import React from 'react';
import { redirect, cardColours, capitalise } from '../util/Util';
import { Staff } from '../models/Staff';
import Module from '../util/Module';

const nameRef = React.createRef<HTMLInputElement>();
const telephoneRef = React.createRef<HTMLInputElement>();
const emailRef = React.createRef<HTMLTextAreaElement>();
const restaurantRef = React.createRef<HTMLTextAreaElement>();
const haspassedtrainingRef = React.createRef<HTMLTextAreaElement>();

export default class Staff2 extends Module<Staff> {
  constructor(props: { match: { path: string } }) {
    super(props, {
      apiData: {
        full_name: nameRef,
        email: emailRef,
        restaurant_id: restaurantRef,
        telephone_number: telephoneRef,
        has_passed_training: haspassedtrainingRef
      },
      renderAll: (staff: Staff[]) => (
        <div
          className="columns is-multiline is-vcentered"
          style={{
            textAlign: 'center',
            justifyContent: 'center',
            padding: '2vw',
            position: 'relative'
          }}
        >
          {staff.map(
            (
              { restaurant_id, full_name, image_url, has_passed_training },
              i
            ) => {
              return (
                <div
                  className="column is-one-fifth"
                  key={i}
                  style={{ padding: '1vw' }}
                >
                  <div className="card-image">
                    <figure className="image is-4by3">
                      <img
                        src={staff.image_url}
                        style={{
                          maxWidth: '25vw',
                          margin: 'auto',
                          boxShadow:
                            '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)',
                          objectFit: 'cover'
                        }}
                      />
                    </figure>
                  </div>
                  <article
                    className={`tile is-child notification ${
                      cardColours[i % cardColours.length]
                    }`}
                  >
                    <p className="title">{full_name}</p>
                    <p className="subtitle">{restaurant_id}</p>
                    <p className="subtitle">{has_passed_training}</p>
                    <button
                      className="button is-warning is-small"
                      onClick={() => redirect(`staff/find/${full_name}`)}
                    >
                      <span className="icon is-small">
                        <i className="fas fa-edit"></i>
                      </span>
                      <span>Edit</span>
                    </button>
                  </article>
                </div>
              );
            }
          )}
        </div>
      ),

      renderSingle: (staff: Staff) => {
        return (
          <div>
            <div className="card-image">
              <figure className="image is-150x120">
                <img
                  src={staff.image_url}
                  style={{
                    maxWidth: '25vw',
                    margin: 'auto',
                    boxShadow:
                      '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)',
                    objectFit: 'cover',
                    maxHeight: '14.2vw'
                  }}
                />
              </figure>
            </div>
            <div className="card-content">
              <div className="media" style={{ justifyContent: 'center' }}>
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
                          placeholder={staff.full_name.toString()}
                          disabled
                          style={{ width: '40px' }}
                        />
                      </p>
                    </div>
                  </div>
                </div>

                <div className="field is-horizontal">
                  <div className="field-label is-normal">
                    <label className="label" style={{ marginLeft: '25px' }}>
                      Name
                    </label>
                  </div>
                  <div className="field-body">
                    <div className="field">
                      <p className="control">
                        <input
                          defaultValue={staff.full_name}
                          className="input"
                          type="text"
                        />
                      </p>
                    </div>
                  </div>
                </div>
                <div className="field has-addons is-horizontal">
                  <div className="field-label is-normal">
                    <label className="label">restaurant_id</label>
                  </div>
                  <p className="control">
                    <input
                      className="input"
                      type="text"
                      defaultValue={staff.restaurant_id.toFixed(2)}
                    />
                  </p>
                </div>
              </div>
              <br />

              <div className="content">
                <div className="field is-horizontal">
                  <div className="field-label is-normal">
                    <label className="label">Has passed training?</label>
                  </div>
                  <div className="field-body">
                    <div className="field">
                      <div className="control">
                        <textarea
                          defaultValue={staff.has_passed_training.toString()}
                          className="textarea"
                          style={{ minHeight: '4vw' }}
                        ></textarea>
                      </div>
                    </div>
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
                <label className="label">Full Name</label>
              </div>
              <div className="field-body">
                <div className="field">
                  <p className="control">
                    <input
                      placeholder="Enter the staff's fullname"
                      className="input"
                      type="text"
                    />
                  </p>
                </div>
              </div>
            </div>

            <div className="field is-horizontal">
              <div className="field-label is-normal">
                <label className="label">Telephone Number</label>
              </div>
              <div className="field-body">
                <div className="field">
                  <p className="control">
                    <input
                      placeholder="Enter the staff's telephone number"
                      className="input"
                      type="text"
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
                      placeholder="Enter the staff's restaurant ID"
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
                      placeholder="Enter the staff's password"
                      className="input"
                      type="text"
                    />
                  </p>
                </div>
                <br />
              </div>
            </div>
          </div>
        );
      }
    });
  }
}
