import React from 'react';
import PropTypes from 'prop-types';
import { Router, Route } from 'react-router-dom';
import Navbar from '../components/Navbar';
import history from '../history';
import MainBox from '../components/MainBox';

// TODO: Refactor this into a dynamic nested route handler

class FindRestaurant extends React.Component {
  render() {
    return (
      <Router history={history}>
        <MainBox>
          {/* TODO: Add a search bar element, edit button, delete button */}
        </MainBox>
      </Router>
    );
  }
}

class ViewRestaurant extends React.Component {
  render() {
    return (
      <Router history={history}>
        <MainBox>
          {/* TODO: Fetch restaurants from the API, add sort buttons */}
        </MainBox>
      </Router>
    );
  }
}

class CreateRestaurant extends React.Component {
  render() {
    return (
      <Router history={history}>
        <MainBox>
          {/* TODO: Display a form that has input fields for all fields on the Restaurants model */}
        </MainBox>
      </Router>
    );
  }
}

const Restaurants = ({ match }: { match: { url: string } }) => {
  console.log(match);
  return (
    <Router history={history}>
      <Navbar />
      <Route path={`${match.url}/find`} component={FindRestaurant} />
      <Route path={`${match.url}/find`} component={ViewRestaurant} />
      <Route path={`${match.url}/create`} component={CreateRestaurant} />
    </Router>
  );
};

Restaurants.propTypes = {
  match: PropTypes.shape({ url: PropTypes.string })
};

export default Restaurants;
