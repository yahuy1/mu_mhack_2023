import React, { useState } from 'react'
import './Card.css'

function Card() {
    const [title, setTitle] = useState('My Title');
    const [skills, setSkills] = useState(['React', 'JavaScript', 'HTML', 'CSS']);
    const [description, setDescription] = useState('My Description');

    const handleTitleChange = event => setTitle(event.target.value);
    const handleSkillsChange = event => setSkills(event.target.value.split(','));
    const handleDescriptionChange = event => setDescription(event.target.value);

    return (
        <div className='card-container'>
            <div className='card-title'>
                <h2>
                    <input type="text" readonly='readonly' value={title} onChange={handleTitleChange} />
                </h2>
            </div>
            <p>Skills:</p>
            <div className='card-skills'>
                <input type="text" readonly='readonly' value={skills.join(',')} onChange={handleSkillsChange} />
            </div>
            <p>Description:</p>
            <div className='card-description'>
                <p>
                    <textarea readonly='readonly' value={description} onChange={handleDescriptionChange} />
                </p>
            </div>
        </div>
    );
}

export default Card;
