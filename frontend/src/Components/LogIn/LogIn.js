import React, { useState, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './LogIn.css';
import { useUserContext } from '../../Controllers/userContext';
import axios from 'axios';


function LogIn() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const emailRef = useRef();
    const passwordRef = useRef();
    const { signInUser } = useUserContext();
    const { user, logoutUser } = useUserContext();

    const handleEmailChange = (event) => {
        setEmail(event.target.value);
    };

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    };

    function handleSubmit (event) {
        event.preventDefault();
        console.log("emailRef:" + email);
        console.log("passwordRef:" + password);
        // Add code to submit form data to backend here
        try {
            if (email && password)
                signInUser(email, password);
                
                axios({
                    method: 'post',
                    url: 'http://localhost:8080/api/user/info/',
                    data: {
                        id: user.uid,
                        userType: user.uid.charAt(0) === 't'? "Team" : "Individual"
                    }
                })
                .then(function (response) {
                    console.log("Response from login");
                    console.log(response);
                    if (response.status === 204) {
                        navigate("/user/create");
                    }   else {
                        navigate("/feed");
                    }
                });
        } catch {
            console.log("Failed to sign in user");
        }
    };

    return (
        <div className="flex-container">
            <div className="content-container">
                <div className="form-container">
                    <form onSubmit={handleSubmit}>
                        <h1>Login</h1>
                        <br />
                        <span className="subtitle">USERNAME:</span>
                        <br />
                        <input type="text" name="username" onChange={handleEmailChange} required/>
                        <br />
                        <span className="subtitle">PASSWORD:</span>
                        <br />
                        <input type="password" name="password" onChange={handlePasswordChange} required/>
                        <br />
                        <input type="submit" value="SUBMIT" className="submit-btn" />
                        <Link to='/sign_up'>Sign up now</Link>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default LogIn;