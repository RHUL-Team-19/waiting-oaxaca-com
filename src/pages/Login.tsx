/* eslint-disable @typescript-eslint/camelcase */
import React from 'react';
import history from '../history';
import styled from 'styled-components';
import { Router } from 'react-router-dom';
import '../style/style.css';
import RestClient from '../RestClient';

interface Inputs {
  user_id: string;
  password: string;
}

const LoginContainer = styled.div`
  width: 520px;
  height: 250px;
  margin: auto;
  margin-top: 240px;
`;

const LoginSubmitBtn = styled.div`
  padding-top: 10px;
`;

export default class Login extends React.Component {
  state: Inputs = {
    user_id: '',
    password: ''
  };

  validate = () => {
    RestClient.create<Inputs>('/authentication', this.state)
      .then(res => {
        if (res.statusCode === 200) {history.push('/home')};
        <div class="notification is-warning">
          <button class="invalid information"></button>
        </div>
        //Prompt that the creds were invalid (see https://bulma.io/documentation/elements/notification/)
      })
      .catch(console.error);
  };

  render() {
    return (
      <Router history={history}>
        <div className="Login">
          {/* TODO: Add a logo here (see https://bulma.io/documentation/elements/image/) */}
          <LoginContainer className="box">
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
                />
                <span className="icon is-small is-left">
                  <i className="fas fa-lock"></i>
                </span>
              </p>
            </div>
            <LoginSubmitBtn className="control">
              <button
                className="button is-link is-fullwidth"
                onClick={this.validate}
              >
                Login
              </button>
            </LoginSubmitBtn>
          </LoginContainer>
        </div>
      </Router>
    );
  }
}
