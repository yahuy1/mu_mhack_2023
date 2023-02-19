import React, { useEffect, useState } from "react";
import './OutOfMatchedPage.css'

import Button from '../Button/Button';
import { useNavigate } from "react-router-dom";

const OutOfMatchedPage = () => {
    const navigate = useNavigate();
    return (
        <div className="container">
            <div className="heading-container">
                <h1>Good job!</h1>
                <h1>You already scrolled through all the potential candidate</h1>
                <h1>We will notify you when there is a match</h1>
            </div>
            <div className="button-container">
                <Button onClick={() => navigate("/user/matches")} 
                    button_type="View your current matches" 
                    button_css="button-matched" />
            </div>
        </div>
    );
};

export default OutOfMatchedPage;