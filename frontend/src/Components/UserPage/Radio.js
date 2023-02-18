import React, { useState } from 'react';
import './UserProfile.css'

function Radio() {

    const [userType, setUserType] = useState('');
    const handleUserTypeChange = (event) => {
        setUserType(event.target.value);
    }

    return (
        <div className='radio-group'>
            <div className='radio-btn'>
                <input
                    name="individual"
                    type="radio"
                    value="individual"
                    onChange={handleUserTypeChange}
                    checked={userType === 'individual'}
                />
                <label htmlFor="individual">
                    Individual
                </label>
            </div>
            <div className='radion-btn'>
                <input
                    name="team"
                    type="radio"
                    value="team"
                    onChange={handleUserTypeChange}
                    checked={userType === 'team'}
                />
                <label htmlFor="team">
                    Radio Item 1
                </label>
            </div>
        </div>
    );
}

export default Radio;