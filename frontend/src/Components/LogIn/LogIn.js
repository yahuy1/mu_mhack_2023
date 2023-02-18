import React, {useState} from 'react';
import { Link } from 'react-router-dom';
import './LogIn.css';

function LogIn() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleEmailChange = (event) => {
        setEmail(event.target.value);
    };

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log('Email:', email);
        console.log('Password:', password);
        // Add code to submit form data to backend here
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
                        <input type="password" name="password" onChange={handleEmailChange} required/>
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