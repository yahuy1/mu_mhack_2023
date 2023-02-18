import React, { useEffect, useState } from "react";
import './Feed.css'
import Card from '../Card/Card';
import Button from '../Button/Button';
import LogOutButton from '../Button/LogOutButton';

import { useUserContext } from '../../Controllers/userContext';

const Feed = () => {
  const [interest, setInterest] = useState(-1);
  const { user, logoutUser } = useUserContext();

  const swipeLeft = (event) => {
    // Handle button click event here
    let newInterest = 0;
    console.log(newInterest);
    setInterest(newInterest);
  }
  const swipeRight = (event) => {
    let newInterest = 1;
    console.log(newInterest);
    setInterest(newInterest);
  }

  const logOut = (event) => { }

  return (
    <div className="container">
      <div className="card-container">
        <Card
          name="Nhut Do"
          skills={["react", "java"]}
          description="Sth"
        />
      </div>
      <div className="button-container">
        <Button onClick={swipeLeft} button_type="Left" button_css="button-left"/>
        <Button onClick={logoutUser} button_type="LogOut" button_css="button-logout"/>
        <Button onClick={swipeRight} button_type="Right" button_css="button-right"/>

      </div>

    </div>
  );
};

export default Feed;