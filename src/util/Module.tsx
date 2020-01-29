import React, { ReactNode } from 'react';
import { Router, Route } from 'react-router-dom';
import PropTypes from 'prop-types';
import Navbar from '../components/Navbar';
import history from '../history';

export default abstract class Module extends React.Component {
  private section: string;

  static propTypes: { section: PropTypes.Requireable<string> };

  constructor(props: Readonly<{ section: string }>) {
    super(props);
    this.section = props.section;
  }

  abstract find(): JSX.Element;

  abstract view(): JSX.Element;

  abstract create(): JSX.Element;

  render(): ReactNode {
    console.log('rendering');
    return (
      <Router history={history}>
        <Navbar />
        <Route path={`/${this.section}/find`} render={this.find} />
        <Route path={`/${this.section}/view`} render={this.view} />
        <Route path={`/${this.section}/create`} render={this.create} />
      </Router>
    );
  }
}

Module.propTypes = { section: PropTypes.string };
