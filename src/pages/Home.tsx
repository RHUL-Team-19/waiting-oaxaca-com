import React from 'react';
import history from '../history';
import { Router } from 'react-router-dom';

export default class Home extends React.Component {
  render() {
    return (
      <Router history={history}>{
        <mdb-navbar SideClass="navbar navbar-expand-lg navbar-black">
          <links>
              <a class="navbar-brand" href="#">Restaurant name</a>
              <ul class="navbar-nav mr-auto mt-lg-0">
                  <li class="nav-item active">
                      <a class="nav-link" href="#">Home <span class="sr-only">(current)</span></a>
                  </li>
                  <li class="nav-item">
                      <a class="nav-link" href="#">Menu</a>
                  </li>
                  <li class="nav-item">
                      <a class="nav-link" href="#">Order</a>
                  </li>
                  <li class="nav-item">
                      <a class="nav-link" href="#">Payment</a>
                  </li>
              </ul>
          </links>
         </mdb-navbar>
          /*Create a dashboard/navbar */}</Router>
    );
  }
}
