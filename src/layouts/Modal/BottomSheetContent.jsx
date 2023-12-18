import React from 'react';
import styled from 'styled-components';
import { Portal } from 'layouts/';

const BottomSheetItem = styled.li`
  padding: 12px 0;
  cursor: pointer;

  button {
    font-size: 14px;
  }
`;

export default function BottomSheetContent({ onClick, children }) {
  return (
    <Portal>
      <BottomSheetItem onClick={onClick}>
        <button>{children}</button>
      </BottomSheetItem>
    </Portal>
  );
}
