import React from 'react';
import './RightButton.css';

const RightButton = ({ onClick, children }) => {
  return (
    <button className="button" onClick={onClick}>
      {children}
    </button>
  );
};

export default RightButton;