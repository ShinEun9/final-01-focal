import React from 'react';
import { createPortal } from 'react-dom';

export default function Portal({ children }) {
  const rootElement = document.querySelector('#modal-root');

  return <>{rootElement ? createPortal(children, rootElement) : children}</>;
}
