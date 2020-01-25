import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Login from './Login';
import * as serviceWorker from './serviceWorker';
import { createBrowserHistory } from 'history';
import { Router, Route, Redirect } from 'react-router-dom';

const history = createBrowserHistory();

ReactDOM.render(
  <Router history={history}>
    <Redirect to="/login" />
    <Route exact path="/login">
      <Login />
    </Route>
  </Router>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
