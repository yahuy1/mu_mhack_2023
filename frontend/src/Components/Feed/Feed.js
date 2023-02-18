import React, { useEffect, useState } from "react";
// import './Feed.css'
import Card from '../Card/Card';
import LeftButton from '../Button/LeftButton';
import RightButton from '../Button/RightButton';

const Feed = () => {
const [interest, setInterest] = useState(-1);
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

  return (
    <div className="container">
      <Card
        name="Nhut Do"
        skills={["react", "java"]}
        description="Sth"
      />
      <LeftButton onClick={swipeLeft}>
        Left
      </LeftButton>
      <RightButton onClick={swipeRight}>
        Right
      </RightButton>
      
    </div>
  );
};

export default Feed;