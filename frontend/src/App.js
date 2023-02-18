import React from 'react'
import './App.css'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'

import Feed from './Components/Feed/Feed.js'
import LogIn from './Components/LogIn/LogIn';
import Sign_Up from './Components/Sign_Up/Sign_Up.js'

import { UserContextProvider, useUserContext } from './Controllers/userContext';
import PrivateRoute from './Components/PrivateRoute/PrivateRoute';

function App() {
  const { user } = useUserContext();
  return (
    <Router>
      <div className="App">
        <UserContextProvider>
          <Routes>
            <PrivateRoute path="/feed" element={<Feed />} />
            <Route path="/sign_up" element={<Sign_Up />}/>
            <Route path="/log_in" element={<LogIn/>} />
          </Routes>
        </UserContextProvider>
      </div>
    </Router>
  );
}

export default App;
