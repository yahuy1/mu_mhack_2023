import React, { useState } from 'react';
import './Sign_Up.css';
import axios from 'axios';

function Sign_Up() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleEmailChange = (event) => {
        setEmail(event.target.value);
    };

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    };

    const handleSubmit = (event) => {
        try {
            event.preventDefault();
            console.log('Email:', email);
            console.log('Password:', password);
            // Add code to submit form data to backend here
            axios.post('http://localhost:8080/api/user/signup', {
                email: email,
                password: password
            })
            console.log("Signed up succesfully")
        } catch (error) {
            console.log("Unable to sign up");
        } 
    };
    
    return (
        <div className="container">
            <h1>Registration Form</h1>
            <p>Please fill out this form with the required information</p>
            <form onSubmit={handleSubmit}>
                <fieldset>
                    <label>Enter Your Email: <input type="email" name="email" onChange={handleEmailChange} required /></label>
                    <label>Create a New Password: <input type="password" name="password"  onChange={handlePasswordChange} required /></label>
                </fieldset>
                <input type="submit" value="Submit" />
            </form>
        </div>
    );
}

export default Sign_Up;
