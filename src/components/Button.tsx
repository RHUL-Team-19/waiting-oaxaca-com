import React from 'react';
import styled from 'styled-components';

const StyledButton = styled.button`
  display: flex;
  background-color: #2196f3;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  padding-right: 16px;
  padding-left: 16px;
  min-width: 88px;
  border-radius: 2px;
  color: #fff;
  font-size: 14px;
  font-weight: 400;
  cursor: pointer;
  font-family: 'InterRegular';
`;

type ButtonProps = {
  text: string;
  width: number;
  height: number;
  marginTop: number;
};

const Button = ({ text, width, height, marginTop }: ButtonProps) => (
  <StyledButton style={{ width, height, marginTop, alignSelf: 'center' }}>
    {text}
  </StyledButton>
);

export default Button;
