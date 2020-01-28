import React from 'react';
import history from '../history';
import { Router } from 'react-router-dom';

export default class Home extends React.Component {
  render() {
    return (
      <Router history={history}>{/* TODO: Create a dashboard/navbar */}</Router>
    );
  }
}
