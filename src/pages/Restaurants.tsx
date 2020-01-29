import React from 'react';
import Module from '../util/Module';
import { Router } from 'react-router-dom';
import MainBox from '../components/MainBox';
import history from '../history';

export default class Restaurants extends Module {
  constructor() {
    super({ section: 'restaurants' });
  }

  find() {
    return (
      <Router history={history}>
        <MainBox>
          {/* TODO: Add a search bar element, edit button, delete button */}
        </MainBox>
      </Router>
    );
  }

  view() {
    return (
      <Router history={history}>
        <MainBox>
          {/* TODO: Fetch restaurants from the API, add sort buttons */}
        </MainBox>
      </Router>
    );
  }

  create() {
    return (
      <Router history={history}>
        <MainBox>
          {/* TODO: Display a form that has input fields for all fields on the Restaurants model */}
        </MainBox>
      </Router>
    );
  }
}
