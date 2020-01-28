import React from 'react';
import ReactDOM from 'react-dom';
import Login from './pages/Login';
import history from './history';
import * as serviceWorker from './serviceWorker';
import Home from './pages/Home';
import { Router, Route, Redirect, Switch } from 'react-router-dom';

ReactDOM.render(
  <Router history={history}>
    <Redirect to="/login" />
    <Switch>
      <Route exact path="/login" component={Login} />
      <Route exact path="/home" component={Home} />
    </Switch>
  </Router>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
