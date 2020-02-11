import React from 'react';
import styled from 'styled-components';

const StyledBox = styled.div`
  margin-top: 2vw;
  max-width: 95%;
  height: calc(100vh - 8vw);
  overflow-y: scroll;
  overflow-x: hidden;
  background-color: white;
  border-radius: 12px;
`;

const MainBox = (props: { children: JSX.Element }) => (
  <StyledBox className="container is-desktop is-vcentered is-centered">
    {props.children}
  </StyledBox>
);

export default MainBox;
