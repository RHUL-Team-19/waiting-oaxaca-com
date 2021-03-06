import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, Switch, Redirect } from 'react-router-dom';
import * as serviceWorker from './serviceWorker';
import history from './history';
import Login from './pages/Login';
import Home from './pages/Home';
import Restaurants from './pages/Restaurants';
import Menu from './pages/Menu';
import Staff from './pages/Staff';
import Orders from './pages/Orders';

ReactDOM.render(
  <Router history={history}>
    <Redirect to="/login" />
    <Switch>
      <Route exact path="/login" component={Login} />
      <Route exact path="/home" component={Home} />
      <Route path="/restaurants" component={Restaurants} />
      <Route path="/menu" component={Menu} />
      <Route path="/staff" component={Staff} />
      <Route path="/order" component={Orders} />
    </Switch>
  </Router>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
