import React from 'react';
import './LogIn.css';

function LogIn() {
    return (
        <div className="flex-container">
            <div className="content-container">
                <div className="form-container">
                    <form>
                        <h1>Login</h1>
                        <br />
                        <br />
                        <span className="subtitle">USERNAME:</span>
                        <br />
                        <input type="text" name="username"/>
                        <br />
                        <span className="subtitle">PASSWORD:</span>
                        <br />
                        <input type="password" name="password" />
                        <br /><br />
                        <input type="submit" value="SUBMIT" className="submit-btn" />
                    </form>
                </div>
            </div>
        </div>
    );
}

export default LogIn;