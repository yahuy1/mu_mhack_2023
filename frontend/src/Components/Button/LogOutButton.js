import React from 'react';
import './LogOutButton.css';

const LogOutButton = ({ onClick, children }) => {
  return (
    <button className="button" onClick={onClick}>
      {children}
    </button>
  );
};

export default LogOutButton;