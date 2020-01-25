import React from 'react';
import styled from 'styled-components';
import InputField from './components/InputField';
import Button from './components/Button';
import logo from './logo.svg';
import './Login.css';

const StyledLabel = styled.span`
  color: rgba(41, 41, 41, 1);
  font-size: 15px;
  font-weight: 400;
  font-style: normal;
  line-height: 14px;
  margin-top: 30px;
  margin-left: 40px;
`;

const StyledLoginContainer = styled.div`
  margin-top: 40px;
  width: 387px;
  height: 274px;
  background-color: rgba(230, 230, 230, 1);
  border-radius: 5px;
  overflow: hidden;
  flex-direction: column;
  display: flex;
  align-self: center;
`;

export default class Login extends React.Component {
  state = {
    username: '',
    password: ''
  };

  render() {
    return (
      <div className="Login">
        {/* TODO: replace template logo */}
        <img src={logo} className="Login-logo" alt="logo" />
        <StyledLoginContainer>
          <StyledLabel>Staff ID</StyledLabel>
          <InputField
            marginTop={4}
            marginLeft={41}
            onChange={(evt: React.ChangeEvent<HTMLInputElement>) =>
              this.setState({ username: evt.target.value })
            }
          />
          <StyledLabel>Password</StyledLabel>
          <InputField
            marginTop={4}
            marginLeft={41}
            type="password"
            onChange={(evt: React.ChangeEvent<HTMLInputElement>) =>
              this.setState({ password: evt.target.value })
            }
          />
          {/* TODO: create a function to validate the credentials */}
          <Button text="Login" width={308} height={36} marginTop={22} />
        </StyledLoginContainer>
      </div>
    );
  }
}
