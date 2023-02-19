import React, { useEffect, useState } from "react";
import './Feed.css'
import { TeamCard, IndividualCard } from '../Card/Card';
import Button from '../Button/Button';
import axios from 'axios'

import { useUserContext } from '../../Controllers/userContext';
import { redirect } from "react-router-dom";

const Feed = () => {
  const [interest, setInterest] = useState(-1);
  const { user, logoutUser } = useUserContext();

  const [infoQueue, setInfoQueue] = useState({
    persons: []
  });

  const userType = user.uid.charAt(0) === 't'? "Team" : "Individual";
  
  useEffect(() => {
    axios({
      method: 'post',
      url: 'http://localhost:8080/api/feed',
      data: {
        id: user.uid,
        userType: userType
      }
    })
    .then(response => {
      if (response.status === 204)
        console.log("No data");
      else
        setInfoQueue({persons: response.data});
    })

  },[])

  const removePerson = (index) => {
    // create a copy of the persons array in the infoQueue state
    const newPersons = [...infoQueue.persons];
    // remove the person at the specified index
    newPersons.splice(index, 1);
    // update the infoQueue state with the new persons array
    setInfoQueue({ ...infoQueue, persons: newPersons });
  };

  const addPersons = (newPersons) => {
    // create a copy of the persons array in the infoQueue state
    const currentPersons = [...infoQueue.persons];
    // push the new persons onto the array
    currentPersons.push(...newPersons);
    // update the infoQueue state with the new persons array
    setInfoQueue({ ...infoQueue, persons: currentPersons });
  };  

  const requestNewData = (event) => {
    if (infoQueue.persons.length > 3) return;
    axios({
      method: 'post',
      url: 'http://localhost:8080/api/feed/',
      data: {
          id: user.uid,
          userType: userType
      }
    })
    .then(function (response) {
      addPersons(response.data);
    });
  }

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
    removePerson(0);
    requestNewData();
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
    removePerson(0);
    requestNewData();
  }

  const logOut =  async (event) => {
    logoutUser();
  }

  return (
    <div className="container">
      <div className="card-container">
      {infoQueue.persons.length !== 0 && (
        userType === "Team" ?
        <TeamCard
          name={infoQueue.persons[0].name}
          member={infoQueue.persons[0].member}
          techStack={infoQueue.persons[0].techStack}
          description={infoQueue.persons[0].description}
          contacts={infoQueue.persons[0].contacts}
        />
        : <IndividualCard
        name={infoQueue.persons[0].name}
        techStack={infoQueue.persons[0].techStack}
        description={infoQueue.persons[0].description}
        contacts={infoQueue.persons[0].contacts}
      />
      )}
      </div>
      <div className="button-container">
        <Button onClick={() => swipeLeft(infoQueue.persons[0].id)} button_type="Left" button_css="button-left"/>
        <Button onClick={logOut} button_type="LogOut" button_css="button-logout"/>
        <Button onClick={() => swipeRight(infoQueue.persons[0].id)} button_type="Right" button_css="button-right"/>

      </div>
    </div>
  );
};

export default Feed;