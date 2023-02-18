import React from 'react'
import './App.css'
import SignUp from './Components/Sign_Up/Sign_Up'

function App() {
  return (
    <div className="App">
      <Card
        name="John Smith"
        skills={['React', 'JavaScript', 'CSS', 'C++', 'C#']}
        description="I'm a front-end developer with 3 years of experience. I specialize in building responsive user interfaces with React."
      />
    </div>
  );
}

export default App;
