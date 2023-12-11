import React from 'react';
import styled from 'styled-components';

const StyledIconButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 24px;
  height: 24px;
  padding: 0;
`;

export default function IconButton({ children, onClick }) {
  return <StyledIconButton onClick={onClick}>{children}</StyledIconButton>;
}
