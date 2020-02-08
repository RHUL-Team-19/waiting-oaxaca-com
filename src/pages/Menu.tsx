/* eslint-disable @typescript-eslint/camelcase */
import React from 'react';
import Module from '../util/Module';
import MainBox from '../components/MainBox';
import { Route, Router } from 'react-router-dom';
import { redirect, capitalise } from '../util/Util';
import history from '../history';
import { Meal } from '../models/Meal';

const mockMenu: Meal[] = [
  {
    meal_id: 2,
    name: 'Tacos',
    price: 0.5,
    description:
      'Fried tortilla filled with a choice of filling (beaf, chesse, letuce, sweetcorn, peppers) and sauce.',
    is_vegan: false,
    is_vegetarian: false,
    does_contain_egg: false,
    does_contain_soy: false,
    does_contain_fish: false,
    does_contain_lactose: true,
    does_contain_wheat: true,
    does_contain_nuts: false,
    does_contain_gluten: true,
    does_contain_dairy: true,
    image_url: 'https://objects.wsantos.net/oaxaca-com/menu/images/tacos.jpg'
  }
];

const renderAll = () => (
  <table className="table is-fullwidth" style={{ marginLeft: '80px', marginRight: '280px'}}>
    <thead>
      <tr>
        <th>ID</th>
        <th>Name</th>
        <th>Price</th>
        <th>Description</th>
        <th>Allergies</th>

      </tr>
    </thead>

    {mockMenu.map(({ meal_id, name, price, description, is_vegan}) => {
      var is_vegan_str: string = String(is_vegan)
      var titleConentent = "Is_vegan:  " + is_vegan_str;
      return (
        <tbody key={meal_id}>
          <tr>
            <th>{meal_id}</th>
            <td>{name}</td>
            <td>{price}</td>
            <td>{description}</td>
            <td>
              <a href = "" title = {titleConentent}> Allergies</a>
            </td>

            <td>
              <button
                className="button is-warning is-small"
                onClick={() => redirect(`menu/find/${meal_id}`)}
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
  match: { params: { meal_id: number | string } };
}) => {
  if (props.match.params.meal_id === 'all') return renderAll();
  const meal = mockMenu.find(
    ({ meal_id }) => meal_id === Number(props.match.params.meal_id)
  );
  return (
    <div
      className="card is-centered"
      style={{
        width: '452px',
        margin: 'auto',
        marginTop: '20px'
      }}
    >
      <div className="card-image">
        <figure className="image is-150x120">
          <img src={meal?.image_url} alt="Placeholder image" />
        </figure>
      </div>
      <div className="card-content">
        <div className="media">
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
                    placeholder={meal?.meal_id.toString()}
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
                    defaultValue={meal?.name}
                    className="input"
                    type="text"
                  />
                </p>
              </div>
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
              defaultValue={meal?.price.toFixed(2)}
            />
          </p>
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
                    defaultValue={meal?.description}
                    className="textarea"
                  ></textarea>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="field is-grouped is-grouped-multiline">
          {Object.entries(meal!)
            .filter(
              ([field]) => field.startsWith('does') || field.startsWith('is')
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

        <br />
      </div>
      <footer className="card-footer">
        <p className="card-footer-item">
          {/* TODO: Make API call onClick */}
          <button className="button is-success">
            <span className="icon is-small">
              <i className="fas fa-check"></i>
            </span>
            <span>Save</span>
          </button>
        </p>
        <p className="card-footer-item">
          {/* TODO: Make API call onClick */}
          <button className="button is-danger">
            <span>Delete</span>
            <span className="icon is-small">
              <i className="fas fa-times"></i>
            </span>
          </button>
        </p>
        <p className="card-footer-item">
          {/* TODO: Make API call onClick */}
          <a className="button is-light">Reset</a>
        </p>
      </footer>
    </div>
  );
};

export default class Menu extends Module {
  state = { meal_id: 'all' };

  find = () => {
    if (this.props.location.pathname.split('/').length === 4) {
      return (
        <MainBox>
          <Route path="/menu/find/:meal_id" render={renderSingle} />
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
                  placeholder="Enter the meal's ID"
                  onChange={(evt: React.ChangeEvent<HTMLInputElement>) =>
                    this.setState({ meal_id: evt.target.value })
                  }
                />
              </div>
              <div className="control">
                <a
                  className="button is-info"
                  onClick={() => redirect(`menu/find/${this.state.meal_id}`)}
                >
                  Find
                </a>
              </div>
              <div className="control">
                <a
                  className="button is-primary"
                  onClick={() => redirect('menu/find/all')}
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
              top: 'calc(100vh - 720px)'
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
              {Object.keys(mockMenu[0])
                .filter(
                  field => field.startsWith('does') || field.startsWith('is')
                )
                .map((field, i) => {
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
