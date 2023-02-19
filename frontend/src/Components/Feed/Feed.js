import React, { useEffect, useState } from "react";
import './Feed.css'
import Card from '../Card/Card';
import Button from '../Button/Button';
import axios from 'axios'

import { useUserContext } from '../../Controllers/userContext';
import { redirect } from "react-router-dom";

const Feed = () => {
  const [interest, setInterest] = useState(-1);
  const { user, logoutUser } = useUserContext();

  const [info, setInfo] = useState({
    persons: []
  })

  const [curPersonIdx, setCurPersonIdx] = useState(0);

  useEffect(() => {
    axios({
      method: 'post',
      url: 'http://localhost:8080/api/feed',
      data: {
        id: user.uid,
        userType: user.uid.charAt(0) === 't'? "Team" : "Individual"
      }
    })
    .then(response => {
      setInfo({persons: response.data});
    })

  },[])

  const swipeLeft = (param) => {
    // Handle button click event here
    axios({
      method: 'post',
      url: 'http://localhost:8080/api/interact/interest/',
      data: {
          individualID: user.uid,
          teamID: param
      }
    })
    .then(function (response) {
      console.log(response.status);
    });
    
    setCurPersonIdx(curPersonIdx+1);
    console.log("cur idx: " + curPersonIdx);
  }
  const swipeRight = (param) => {
    axios({
      method: 'post',
      url: 'http://localhost:8080/api/interact/uninterest/',
      data: {
          individualID: user.uid,
          teamID: param
      }
    })
    .then(function (response) {
      console.log(response.status);
    });
    setCurPersonIdx(curPersonIdx+1);
    console.log("cur idx: " + curPersonIdx);
  }

  const logOut =  async (event) => {
    logoutUser();
  }
  
  return (
    <div className="container">
      <div className="card-container">
      {info.persons.length !== 0 && (
        <Card
          name={info.persons[curPersonIdx].name}
          email={info.persons[curPersonIdx].email}
          techStack={info.persons[curPersonIdx].techStack}
          description={info.persons[curPersonIdx].description}
          contacts={info.persons[curPersonIdx].contacts}
        />
      )}
      </div>
      <div className="button-container">
        <Button onClick={() => swipeLeft(info.persons[curPersonIdx].id)} button_type="Left" button_css="button-left"/>
        <Button onClick={logOut} button_type="LogOut" button_css="button-logout"/>
        <Button onClick={() => swipeRight(info.persons[curPersonIdx].id)} button_type="Right" button_css="button-right"/>

      </div>
    </div>
  );
};

export default Feed;