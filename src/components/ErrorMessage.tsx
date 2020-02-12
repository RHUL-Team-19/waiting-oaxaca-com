import React from 'react';
import styled from 'styled-components';

const StyledNotification = styled.div`
  width: 20vw;
  font-size: 1vw;
  text-align: center;
  position: relative;
  top: 50%;
  transform: translateY(-50%) translateX(-50%);
  left: 50%;
`;

const ErrorMessage = ({ action }: { action: string }) => (
  <StyledNotification className="notification is-danger">
    There was an error while attempting to {action}, see the console for more
    details.
  </StyledNotification>
);

export default ErrorMessage;
