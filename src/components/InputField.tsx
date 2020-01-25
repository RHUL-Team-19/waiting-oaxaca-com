import React from 'react';
import styled from 'styled-components';

const StyledContainer = styled.div`
  display: flex;
  width: 301px;
  height: 35px;
  background-color: transparent;
  flex-direction: row;
  align-items: center;
  border-color: rgba(189, 189, 189, 1);
  border-width: 2px;
  border-right-width: 2px;
  border-bottom-width: 2px;
  border-left-width: 2px;
  border-style: solid;
`;

const StyledInput = styled.input`
  text-indent: 9px;
  width: 301px;
  background-color: rgba(230, 230, 230, 1);
  color: #000;
  align-self: stretch;
  padding-top: 16px;
  padding-right: 5px;
  padding-bottom: 15px;
  border-color: #000000;
  border-width: 0px;
  font-size: 16px;
  line-height: 16px;
  border-style: solid;
  background: transparent;
`;

type InputFieldProps = {
  type?: string;
  onChange: (evt: React.ChangeEvent<HTMLInputElement>) => void;
  marginTop: number;
  marginLeft: number;
};

const InputField = ({
  type,
  onChange,
  marginTop,
  marginLeft
}: InputFieldProps) => (
  <StyledContainer style={{ marginTop, marginLeft }}>
    <StyledInput type={type} onChange={onChange}></StyledInput>
  </StyledContainer>
);

export default InputField;
