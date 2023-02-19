import React from 'react';
import './Card.css';

const TeamCard = ({ name, member, techStack, description, contacts }) => {


    return (
        <div className="user-container">
            <div className="user-name">{name}</div>
            <div className="member-list">
                {member.map((mem, index) => (
                    <div key={index} className="member-item">
                        {mem}
                    </div>
                ))}
            </div>
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
            <div className="contacts">{contacts}</div>
        </div>
    );
};

const IndividualCard = ({ name, techStack, description, contacts }) => {
  

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
        <div className="contacts">{contacts}</div>
      </div>
    );
  };
  
  export { TeamCard, IndividualCard };