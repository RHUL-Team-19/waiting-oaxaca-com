/* eslint-disable react/display-name, @typescript-eslint/camelcase, react/prop-types */
import React from 'react';
import { redirect, cardColours, capitalise } from '../util/Util';
import { Meal } from '../models/Meal';
import Module from '../util/Module';

const mealFields = [
  'is_vegan',
  'is_vegetarian',
  'does_contain_nuts',
  'does_contain_gluten',
  'does_contain_dairy',
  'does_contain_lactose',
  'does_contain_wheat',
  'does_contain_fish',
  'does_contain_soy',
  'does_contain_egg'
];
const nameRef = React.createRef<HTMLInputElement>();
const telephoneRef = React.createRef<HTMLInputElement>();
const locationRef = React.createRef<HTMLTextAreaElement>();

export default class Menu extends Module<Meal> {
  constructor(props: { match: { path: string } }) {
    super(props, {
      apiData: {
        name: nameRef,
        location: locationRef,
        telephone_number: telephoneRef
      },
      renderAll: (menu: Meal[]) => (
        <div
          className="columns is-multiline is-vcentered"
          style={{
            textAlign: 'center',
            justifyContent: 'center',
            padding: '2vw',
            position: 'relative'
          }}
        >
          {menu.map(({ meal_id, name, image_url }, i) => {
            return (
              <div
                className="column is-one-fifth"
                key={i}
                style={{ padding: '1vw' }}
              >
                <div className="card-image">
                  <figure className="image is-4by3">
                    <img
                      src={image_url}
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
                  <p className="title">{meal_id}</p>
                  <p className="subtitle">{name}</p>
                  <button
                    className="button is-warning is-small"
                    onClick={() => redirect(`menu/find/${meal_id}`)}
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

      renderSingle: (meal: Meal) => {
        return (
          <div>
            <div className="card-image">
              <figure className="image is-150x120">
                <img
                  src={meal.image_url}
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
                          placeholder={meal.meal_id.toString()}
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
                          defaultValue={meal.name}
                          className="input"
                          type="text"
                        />
                      </p>
                    </div>
                  </div>
                </div>
                <div className="field has-addons is-horizontal">
                  <div className="field-label is-normal">
                    <label className="label">Price</label>
                  </div>
                  <p className="control">
                    <p className="control">
                      <a className="button is-static">£</a>
                    </p>
                  </p>
                  <p className="control">
                    <input
                      className="input"
                      type="text"
                      defaultValue={meal.price.toFixed(2)}
                    />
                  </p>
                </div>
              </div>
              <br />

              <div className="content">
                <div className="field is-horizontal">
                  <div className="field-label is-normal">
                    <label className="label">Description</label>
                  </div>
                  <div className="field-body">
                    <div className="field">
                      <div className="control">
                        <textarea
                          defaultValue={meal.description}
                          className="textarea"
                          style={{ minHeight: '4vw' }}
                        ></textarea>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div
                className="field is-grouped is-grouped-multiline"
                style={{ justifyContent: 'center' }}
              >
                {Object.entries(meal!)
                  .filter(
                    ([field]) =>
                      field.startsWith('does') || field.startsWith('is')
                  )
                  .map(([field, checked], i) => {
                    const splittedField = field.split('_').slice(1);
                    if (field.startsWith('d')) {
                      const [contain, allergen] = splittedField;
                      field = `${capitalise(contain)}s ${allergen}`;
                    } else {
                      const [veg] = splittedField;
                      field = capitalise(veg);
                    }
                    return (
                      <div key={i} style={{ padding: '10px' }}>
                        <input
                          className="is-checkradio is-rtl is-circle"
                          id="exampleRtlCheckbox"
                          type="checkbox"
                          name="exampleRtlCheckbox"
                          checked={checked as boolean}
                        />
                        <label className="label" htmlFor="exampleRtlCheckbox">
                          {field}
                        </label>
                      </div>
                    );
                  })}
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
                      placeholder="Enter the meal's name"
                      className="input"
                      type="text"
                    />
                  </p>
                </div>
              </div>
            </div>

            <div className="field has-addons is-horizontal">
              <div className="field-label is-normal">
                <label className="label">Price</label>
              </div>
              <div className="field-body">
                <p className="control">
                  <p className="control">
                    <a className="button is-static">£</a>
                  </p>
                </p>
                <p className="control">
                  <input
                    className="input"
                    type="text"
                    placeholder="Enter the meal's price"
                  />
                </p>
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
                      placeholder="Enter the meal's Description"
                      className="textarea"
                    ></textarea>
                  </div>
                </div>
              </div>
            </div>

            <div
              className="field is-grouped is-grouped-multiline"
              style={{ marginLeft: '140px' }}
            >
              {mealFields.map((field, i) => {
                const splittedField = field.split('_').slice(1);
                if (field.startsWith('d')) {
                  const [contain, allergen] = splittedField;
                  field = `${capitalise(contain)}s ${allergen}`;
                } else {
                  const [veg] = splittedField;
                  field = capitalise(veg);
                }
                return (
                  <div key={i} style={{ padding: '10px' }}>
                    <input
                      className="is-checkradio is-rtl is-circle"
                      id="exampleRtlCheckbox"
                      type="checkbox"
                      name="exampleRtlCheckbox"
                      checked={false}
                    />
                    <label className="label" htmlFor="exampleRtlCheckbox">
                      {field}
                    </label>
                  </div>
                );
              })}
            </div>
            <br />
          </div>
        );
      }
    });
  }
}
