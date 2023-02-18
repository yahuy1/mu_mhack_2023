import React from 'react';
import './Button.css';

const Button = ({ onClick, button_type, button_css }) => {
  return (
    <button className={button_css} onClick={onClick}>
      {button_type}
    </button>
  );
};

export default Button;