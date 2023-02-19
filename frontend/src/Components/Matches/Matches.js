import React, { useState, useEffect } from 'react';
import Card from '../Card/Card';
import Button from '../Button/Button';
import './Matches.css';

function Matches() {

    const n = 10;
    const [cards, setCards] = useState(Array.from({ length: n }, (_, i) => i + 1));

    const handleRemoveCard = id => {
        setCards(prevCard => prevCard.filter(cards => cards !== id));
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
                {cards.map(index => (
                    <div key={index}>
                        <span>
                            <Card
                                name='John Doe'
                                email='test.email@example.com'
                                techStack={['C#', 'Python', 'React', 'Node']}
                                description='When you run infront of car you get tired. When you run behind car you get exhausted'
                                contacts='onlyfans.com/JohnDoe'
                            />
                        </span>
                        <div className="button-container">
                            <Button onClick={() => {swipeLeft(); handleRemoveCard(index)}} button_type="Decline" button_css="button-left" />
                            <Button onClick={() => {swipeRight(); handleRemoveCard(index)}} button_type="Accept" button_css="button-right" />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Matches;