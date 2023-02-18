import React, { useState } from 'react';
import Select from "react-select";
import './UserProfile.css';
import { selectOptions } from './Data';
import Radio from './Radio';

function UserProfile() {

    const [username, setUsername] = useState('');
    const [description, setDescription] = useState('');
    const [member, setMember] = useState([]);
    const [contact, setContact] = useState('');


    const handleUsernameChange = (event) => {
        setUsername(event.target.value);
    }

    const handleDescriptionChange = (event) => {
        setDescription(event.target.value);
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log('Username:', username);
        console.log('Description:', description);
        // Add code to submit form data to backend here
    };

    const handleContactChange = (event) => {
        setContact(event.target.value);
    }

    const handleMemberChange = (event) => {
        setMember(event.target.value);
    }

    return (
        <div className="container">
            <h1>Update Your Profile</h1>
            <p>Please fill out this form with the required information</p>
            <form onSubmit={handleSubmit}>
                <fieldset>
                    <label>Username: 
                        <input
                            type="text"
                            name="user-name"
                            onChange={handleUsernameChange}
                            required
                        />
                    </label>

                    <label> Participating as: <Radio /></label>

                    <label> Members
                        <input
                            defaultValue=""
                            type="text"
                            name="members"
                            onChange={handleMemberChange}
                        />
                    </label>

                    <label className='skill-label'>Technical Skills: <CustomSelect /></label>

                    <label>A short description about yourself:
                        <textarea
                            defaultValue='Eat ass'
                            name="user-description"
                            rows={5}
                            wrap="hard"
                            onChange={handleDescriptionChange}
                        />
                    </label>

                    <label>Discord:
                        <input
                            type="text"
                            name="contact"
                            onChange={handleContactChange}

                        />
                    </label>

                </fieldset>
                <input type="submit" value="Save" />
            </form>
        </div>
    );
}

const CustomSelect = () => {
    const customStyles = {
        control: (base, state) => ({
            ...base,
            background: "#0a0a23",
            border: 0,
            boxShadow: 'none'
        }),
        menu: base => ({
            ...base,
            marginTop: 0
        }),
        menuList: base => ({
            ...base,
            background: "#adaded",
            color: 'black',
            padding: 0
        }),
        input: base => ({
            ...base,
            color: 'white',
          }),
    };

    const [skills, setSkills] = useState([]);
    const handleSkillsChange = (selected) => {
        setSkills(selected);
    };

    return (
        <Select
            isSearchable
            styles={customStyles}
            isMulti
            options={selectOptions}
            onChange={handleSkillsChange}
            value={skills}
        />
    );
};

export default UserProfile;