import React, { useState } from 'react';
import './UserProfile.css';
import SelectBar from './SelectBar';
import Radio from './Radio';
import { selectOptions } from './Data';
import Select from "react-select";
import axios from 'axios';
import { useUserContext } from '../../Controllers/userContext';

function UserProfile() {
    const { user } = useUserContext();
    const [username, setUsername] = useState('');
    const [description, setDescription] = useState('');
    const [member, setMember] = useState([]);
    const [contact, setContact] = useState('');
    const [userType, setUserType] = useState('');
    const [skills, setSkills] = useState([]);
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



    const handleUsernameChange = (event) => {
        setUsername(event.target.value);
    }

    const handleUserTypeChange = (event) => {
        setUserType(event.target.value);
    }

    const handleMemberChange = (event) => {
        setMember(event.target.value);
    }

    const handleSkillsChange = (selected) => {
        console.log("Skill: " + selected[0]);
        setSkills(selected);
    };

    const handleDescriptionChange = (event) => {
        setDescription(event.target.value);
    }

    const handleContactChange = (event) => {
        setContact(event.target.value);
    }



    const handleSubmit = (event) => {
        event.preventDefault();
        console.log('UserID', user.uid)
        console.log('Username:', username);
        console.log('UserType:', userType);
        console.log('Description:', description);
        console.log('Skills:', skills);
        console.log('Member:', member);
        console.log('Contact:', contact);
        // Add code to submit form data to backend here
        try {
            axios.post('http://localhost:8080/api/user/create', {
                id: user.uid,
                name: username,
                description: description,
                techStack: skills,
                contacts: [contact],
                userType: userType
            })
            console.log("Profile created successfully");
        } catch (error) {
            console.log("unable to create profile, please try again");
        }
    };

    return (
        <div className="container">
            <h1>Update Your Profile</h1>
            <p>Please fill out this form with the required information</p>
            <form onSubmit={handleSubmit}>
                <fieldset>
                    {/*Username components*/}
                    <label>Username:
                        <input
                            type="text"
                            name="user-name"
                            onChange={handleUsernameChange}
                            required
                        />
                    </label>
                    {/* Radio Button element*/}
                    <label> Participating as:
                        <div className='radio-group'>
                            <div id='radio-btn1'>
                                <input
                                    name="Individual"
                                    type="radio"
                                    value="Individual"
                                    onChange={handleUserTypeChange}
                                    checked={userType === 'Individual'}
                                />
                                <label htmlFor="Individual">
                                    Individual
                                </label>
                            </div>
                            <div id='radio-btn2'>
                                <input
                                    name="Team"
                                    type="radio"
                                    value="Team"
                                    onChange={handleUserTypeChange}
                                    checked={userType === 'Team'}
                                />
                                <label htmlFor="Team">
                                    Team
                                </label>
                            </div>
                        </div>
                    </label>
                    {/*Member components*/}
                    <label> Members
                        <input
                            defaultValue=""
                            type="text"
                            name="members"
                            onChange={handleMemberChange}
                        />
                    </label>
                    {/*Skill components*/}
                    <label className='skill-label'>Technical Skills:
                        <Select
                            isSearchable
                            styles={customStyles}
                            isMulti
                            options={selectOptions}
                            onChange={handleSkillsChange}
                            value={skills}
                        />
                    </label>
                    {/*Description components*/}
                    <label>A short description about yourself:
                        <textarea
                            defaultValue='Eat ass'
                            name="user-description"
                            rows={5}
                            wrap="hard"
                            onChange={handleDescriptionChange}
                        />
                    </label>
                    {/*Contact components*/}
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

export default UserProfile;