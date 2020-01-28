import React from 'react';
import history from '../history';
import { Router } from 'react-router-dom';
import Navbar from '../components/Navbar';
import '../style/style.css';

export default class Home extends React.Component {
  render() {
    return (
      <Router history={history}>
        <Navbar />
      </Router>
    );
  }
}
