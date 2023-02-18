import React from 'react';
import './Card.css';
import axios from 'axios'

const Card = ({ name, email, techStack, description, contacts }) => {
  

  return (
    <div className="user-container">
      <div className="user-name">{name}</div>
      <div className="technical-skills">
        <div className="skills-title">Technical Skills</div>
        <div className="skills-list">
          {techStack.map((skill, index) => (
            <div key={index} className="skill-item">
              {skill}
            </div>
          ))}
        </div>
      </div>
      <div className="description">
        <div className="description-title">Short Description</div>
        <div className="description-text">{description}</div>
      </div>
    </div>
  );
};

export default Card;
