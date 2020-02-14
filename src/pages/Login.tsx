/* eslint-disable @typescript-eslint/camelcase */
import React from 'react';
import history from '../history';
import styled from 'styled-components';
import { Router } from 'react-router-dom';
import RestClient from '../RestClient';
import { redirect, current } from '../util/Util';
import * as hm from 'typed-rest-client/Handlers';
import jwtDecode from 'jwt-decode';
import '../style/style.css';

interface Inputs {
  user_id: string;
  password: string;
}

const LoginContainer = styled.div`
  width: 35vw;
  height: 16.5vw;
`;

export default class Login extends React.Component {
  state: Inputs & { invalidLogin: boolean } = {
    user_id: '',
    password: '',
    invalidLogin: false
  };

  validate = () => {
    /* RestClient.create<{ token: string }>('/authentication', this.state)
      .then(res => {
        if (res.statusCode === 200 && res.result) {
          const { token } = res.result;
          RestClient.client.handlers = [new hm.BearerCredentialHandler(token)];
          current.role = JSON.parse(jwtDecode(token)).Audience;
          redirect('home');
        }
      })
      .catch(console.error); */
    if (this.state.user_id === '123' && this.state.password === 'foo') {
      redirect('home');
    } else {
      this.setState({ invalidLogin: true });
      setTimeout(() => this.setState({ invalidLogin: false }), 3000);
    }
  };

  handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') this.validate();
  };

  render() {
    return (
      <Router history={history}>
        <div
          className="Login columns is-desktop is-vcentered is-centered"
          style={{ height: '100vh' }}
        >
          {/* TODO: Add a logo here (see https://bulma.io/documentation/elements/image/) */}
          <LoginContainer
            className="box"
            style={{
              width: '35vw',
              height: this.state.invalidLogin ? '17.5vw' : '16.5vw'
            }}
          >
            <div className="field">
              <label className="label">Staff ID</label>
              <div className="control  has-icons-left">
                <input
                  className="input"
                  type="text"
                  placeholder="Enter your Staff ID"
                  onChange={(evt: React.ChangeEvent<HTMLInputElement>) =>
                    this.setState({ user_id: evt.target.value })
                  }
                  onKeyPress={this.handleKeyPress}
                />
                <span className="icon is-small is-left">
                  <i className="fas fa-user"></i>
                </span>
              </div>
            </div>
            <div className="field">
              <label className="label">Password</label>
              <p className="control  has-icons-left">
                <input
                  className="input"
                  type="password"
                  placeholder="Enter your password"
                  onChange={(evt: React.ChangeEvent<HTMLInputElement>) =>
                    this.setState({ password: evt.target.value })
                  }
                  onKeyPress={this.handleKeyPress}
                />
                <span className="icon is-small is-left">
                  <i className="fas fa-lock"></i>
                </span>
              </p>
              <p
                className="help is-danger"
                style={{
                  display: this.state.invalidLogin ? 'block' : 'none',
                  textAlign: 'center',
                  paddingTop: '0.5vw'
                }}
              >
                <i className="fas fa-exclamation-circle"></i>
                <div
                  style={{
                    display: 'inline',
                    fontSize: '0.9vw',
                    paddingLeft: '0.25vw'
                  }}
                >
                  Wrong password
                </div>
              </p>
            </div>
            <div
              className="control has-icons"
              style={{ paddingTop: this.state.invalidLogin ? 0 : '0.75vw' }}
            >
              <button
                className="button is-link is-fullwidth"
                onClick={this.validate}
              >
                Login
                <span
                  className="icon is-small"
                  style={{ paddingLeft: '1.5vw' }}
                >
                  <i className="fas fa-sign-in-alt"></i>
                </span>
              </button>
            </div>
          </LoginContainer>
        </div>
      </Router>
    );
  }
}
