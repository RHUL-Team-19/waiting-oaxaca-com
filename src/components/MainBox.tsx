import React from 'react';
import styled from 'styled-components';

const StyledBox = styled.div`
  margin-top: 30px;
  margin-left: auto;
  width: 95%;
  margin-right: auto;
  height: 610px;
`;

// This is just done to workaround a typing bug
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const MainBox = (props: { children: JSX.Element }) => (
  <StyledBox className="box">{props.children}</StyledBox>
);

export default MainBox;
