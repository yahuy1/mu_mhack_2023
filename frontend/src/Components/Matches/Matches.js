import React, { useState, useEffect } from 'react';
import { TeamCard, IndividualCard} from '../Card/Card';
import Button from '../Button/Button';
import './Matches.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

import { useUserContext } from '../../Controllers/userContext';


function Matches() {
    const { user, logoutUser } = useUserContext();
    const navigate = useNavigate();
    const [matched, setMatched] = useState(null);
    const [userType, setUserType] = useState(null)
    // const [matched, setMatched] = useState([
    //     {
    //         "_id": "63f15796df26f52f21cb1fd4",
    //         "id": "t446",
    //         "name": "UC Revolution",
    //         "member": [],
    //         "techStack": [
    //             "react",
    //             "bulul"
    //         ],
    //         "description": "kaka",
    //         "interests": [],
    //         "searching": true,
    //         "matched": [],
    //         "contacts": [
    //             "333",
    //             "312"
    //         ],
    //         "interacted": [],
    //         "__v": 0
    //     },
    //     {
    //         "_id": "63f15796df26f52f21cb1fd4",
    //         "id": "t446",
    //         "name": "UC Revolution 2",
    //         "member": [],
    //         "techStack": [
    //             "react",
    //             "bulul"
    //         ],
    //         "description": "kaka",
    //         "interests": [],
    //         "searching": true,
    //         "matched": [],
    //         "contacts": [
    //             "333",
    //             "312"
    //         ],
    //         "interacted": [],
    //         "__v": 0
    //     }
    // ]);

    useEffect(() => {
        axios({
            method: 'post',
            url: 'http://localhost:8080/api/user/info',
            data: {
                id: user.uid,
            }
        })
        .then(response => {
            if (response.status === 204)
            console.log("No data");
            else {
                setUserType(response.data.userType);
            }
        })
      },[])

    useEffect(() => {
        if (userType === null) {
            return
        } else {
            axios({
                method: 'post',
                url: 'http://localhost:8080/api/user/matched',
                data: {
                  id: user.uid,
                  userType: userType
                }
              })
              .then(response => {
                if (response.status === 204)
                  console.log("No data");
                else {
                  const matchedIDs = Object.values(response.data);
                  console.log(matchedIDs)
                  setMatched(matchedIDs);
                }
              })
        }
    }, [userType])

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
            <>
                <h1>Your Matches</h1>
                <div className='back-button'>
                    <Button onClick={() => navigate("/feed")} button_type="Back to Feed" button_css="button-feed" />
                </div>
                <div className='cards-display'>
                    {(matched !== null && matched !== undefined && Array.isArray(matched))
                        ? matched.map((obj, index) => 
                            <div key={index}>
                                <span>
                                    <IndividualCard
                                        name={obj.name}
                                        techStack={obj.techStack.map(elem => (typeof(elem) === "string" ? elem : elem.value))}
                                        description={obj.description}
                                        contacts='onlyfans.com/JohnDoe'
                                    />
                                </span>
                                <div className="button-container">
                                    <Button onClick={() => { swipeLeft(); handleRemoveCard(obj) }} button_type="Decline" button_css="button-left" />
                                    <Button onClick={() => { swipeRight(); handleRemoveCard(obj) }} button_type="Accept" button_css="button-right" />
                                </div>
                            </div>
                        )
                        : <div></div>
                    }
                </div>
            </>
        </div>
    );
}

export default Matches;