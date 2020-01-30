/* eslint-disable @typescript-eslint/camelcase */
import React from 'react';
import Module from '../util/Module';
import usePromise from 'react-promise';
import MainBox from '../components/MainBox';
import { Route, Router } from 'react-router-dom';
import { redirect } from '../util/Util';
import history from '../history';
import RestClient from '../RestClient';
import { Meal } from '../models/Meal';

// TODO: Render each field from the model in a container
const renderSingle = (props: { match: { params: { meal_id: number } } }) => {
  const meal = {
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
  };
  return (
    <div
      className="card is-centered"
      style={{
        width: '452px',
        margin: 'auto',
        marginTop: '70px'
      }}
    >
      <div className="card-image">
        <figure className="image is-300x180">
          <img src={meal?.image_url} alt="Placeholder image" />
        </figure>
      </div>
      <div className="card-content">
        <div className="media">
          <div className="media-content">
            <p className="title is-4">{meal?.name}</p>
          </div>
        </div>

        <div className="content">
          {meal?.description}
          <br />
        </div>
      </div>
    </div>
  );
};

// TODO: List of scrollable list that can be clicked to expand more details
const renderAll = () => <h1>rendering all</h1>;

export default class Menu extends Module {
  state = { meal_id: 'all' }

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
        {/* TODO: Fetch the menu from the API, add sort buttons */}
      </Router>
    );
  }

  create() {
    return (
      <Router history={history}>
        <MainBox>
          {/* TODO: Display a form that has input fields for all fields on the Menu model */}
        </MainBox>
      </Router>
    );
  }
}
