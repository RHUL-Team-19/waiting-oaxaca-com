/* eslint-disable react/display-name, @typescript-eslint/camelcase, react/prop-types */
import React from 'react';
import { redirect, cardColours } from '../util/Util';
import { Restaurant } from '../models/Restaurant';
import Module from '../util/Module';

const nameRef = React.createRef<HTMLInputElement>();
const telephoneRef = React.createRef<HTMLInputElement>();
const locationRef = React.createRef<HTMLTextAreaElement>();

export default class Restaurants extends Module<Restaurant> {
  constructor(props: { match: { path: string } }) {
    super(props, {
      apiData: {
        name: nameRef,
        location: locationRef,
        telephone_number: telephoneRef
      },
      renderAll: (restaurants: Restaurant[]) => (
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
          {restaurants.map(({ restaurant_id, name }, i) => {
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
                  <p className="title">{restaurant_id}</p>
                  <p className="subtitle">{name}</p>
                  <button
                    className="button is-warning is-small"
                    onClick={() =>
                      redirect(`restaurants/find/${restaurant_id}`)
                    }
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
        restaurant_id,
        name,
        telephone_number,
        location
      }: Restaurant) => {
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
                      placeholder={restaurant_id.toString()}
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
                      defaultValue={name}
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
                        defaultValue={telephone_number}
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
                      defaultValue={location}
                      className="textarea"
                      ref={locationRef}
                    ></textarea>
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
          </div>
        );
      }
    });
  }
}
