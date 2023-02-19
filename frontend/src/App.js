import React from 'react'
import './App.css'
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom'
// import axios from 'axios'

import LogIn from './Components/LogIn/LogIn';
import Sign_Up from './Components/Sign_Up/Sign_Up.js'

import { UserContextProvider, useUserContext } from './Controllers/userContext';
import ProtectedRouteUserProfile from './Components/ProtectedRouteUserProfile/ProtectedRouteUserProfile';
import ProtectedRouteFeed from './Components/ProtectedRouteFeed/ProtectedRouteFeed';

function App() {
  return (
    <Router>
      <div className="App">
        <UserContextProvider>
          <Routes>            
            <Route
              path="/feed"
              element={<ProtectedRouteFeed />}
            />
            <Route path="/" element={<Navigate to="/feed" />}/>
            <Route path="/user/create" element={<ProtectedRouteUserProfile/>}/>
            <Route path="/sign_up" element={<Sign_Up />} />
            <Route path="/log_in" element={<LogIn />} />
          </Routes>
        </UserContextProvider>
      </div>
    </Router>
  );
}

export default App;
