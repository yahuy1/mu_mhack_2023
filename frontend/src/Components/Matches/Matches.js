import React, { useState, useEffect } from 'react';
import { TeamCard, IndividualCard} from '../Card/Card';
import Button from '../Button/Button';
import './Matches.css';

function Matches() {

    const [matched, setMatched] = useState([
        {
            "_id": "63f15796df26f52f21cb1fd4",
            "id": "t446",
            "name": "UC Revolution",
            "member": [],
            "techStack": [
                "react",
                "bulul"
            ],
            "description": "kaka",
            "interests": [],
            "searching": true,
            "matched": [],
            "contacts": [
                "333",
                "312"
            ],
            "interacted": [],
            "__v": 0
        },
        {
            "_id": "63f15796df26f52f21cb1fd4",
            "id": "t446",
            "name": "UC Revolution 2",
            "member": [],
            "techStack": [
                "react",
                "bulul"
            ],
            "description": "kaka",
            "interests": [],
            "searching": true,
            "matched": [],
            "contacts": [
                "333",
                "312"
            ],
            "interacted": [],
            "__v": 0
        }
    ]);

    const handleRemoveCard = id => {
        setMatched(prevMatched => prevMatched.filter(matched => matched !== id));
    }

    const swipeLeft = (event) => {
        console.log("Left");
    }

    const swipeRight = (event) => {
        console.log("Right");
    }

    return (
        <div className='matches-container'>
            <h1>Your matches uwu</h1>
            <div className='cards-display'>
                {matched.map(obj => (
                    <div key={obj}>
                        <span>
                            <IndividualCard
                                name={obj.name}
                                email='test.email@example.com'
                                techStack={obj.techStack}
                                description={obj.description}
                                contacts='onlyfans.com/JohnDoe'
                            />
                        </span>
                        <div className="button-container">
                            <Button onClick={() => {swipeLeft(); handleRemoveCard(obj)}} button_type="Decline" button_css="button-left" />
                            <Button onClick={() => {swipeRight(); handleRemoveCard(obj)}} button_type="Accept" button_css="button-right" />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Matches;