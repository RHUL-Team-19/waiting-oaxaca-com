import React from 'react';
import history from '../history';
import styled from 'styled-components';
import { Router } from 'react-router-dom';
import '../style/style.css';

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
  state = {
    username: '',
    password: ''
  };

  validate = () => {
    const {
      state: { username, password }
    } = this;
    console.log(username, password);
    if (username === 'foo' && password === 'bar') {
      history.push('/home');
    }
  };

  render() {
    return (
      <Router history={history}>
        <div className="Login">
          <LoginContainer className="box">
            <div className="field">
              <label className="label">Staff ID</label>
              <div className="control">
                <input
                  className="input"
                  type="text"
                  placeholder="Enter your Staff ID"
                />
              </div>
            </div>
            <div className="field">
              <label className="label">Password</label>
              <p className="control">
                <input
                  className="input"
                  type="password"
                  placeholder="Enter your password"
                />
              </p>
            </div>
            <LoginSubmitBtn className="control">
              <button
                className="button is-link is-fullwidth"
                onClick={this.validate}
              >
                Submit
              </button>
            </LoginSubmitBtn>
          </LoginContainer>
        </div>
      </Router>
    );
  }
}
