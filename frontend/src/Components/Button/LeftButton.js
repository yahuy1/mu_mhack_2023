import React from 'react';
import './LeftButton.css';

const LeftButton = ({ onClick, children }) => {
  return (
    <button className="button" onClick={onClick}>
      {children}
    </button>
  );
};

export default LeftButton;