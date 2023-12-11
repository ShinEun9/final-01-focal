import React from 'react';
import styled from 'styled-components';
import { ReactComponent as MoreIcon } from 'assets/icons/icon-more.svg';

const StyledMoreButton = styled.button`
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  transition: all 0.3s;

  &:hover {
    background-color: var(--border-color);
  }
`;

const MoreButton = ({ onClick, children }) => {
  return (
    <StyledMoreButton onClick={onClick}>
      <MoreIcon />
      <span className={'a11y-hidden'}> {children}</span>
    </StyledMoreButton>
  );
};

export default MoreButton;
