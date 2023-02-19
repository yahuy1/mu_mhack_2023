import React from 'react'
import './App.css'
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom'
// import axios from 'axios'

import Feed from './Components/Feed/Feed.js'
import LogIn from './Components/LogIn/LogIn';
import Sign_Up from './Components/Sign_Up/Sign_Up.js'

import { UserContextProvider, useUserContext } from './Controllers/userContext';
import ProtectedRoute from './Components/ProtectedRoute/ProtectedRoute';
import UserProfile from './Components/UserPage/UserProfile';

function App() {
  const { user, loading } = useUserContext();
  return (
    <Router>
      <div className="App">
        <UserContextProvider>
          <Routes>
            <Route
              path="/feed"
              element={<ProtectedRoute />}
            />
            <Route path="/sign_up" element={<Sign_Up />} />
            <Route path="/log_in" element={<LogIn />} />
            <Route path="/user/create" element={<UserProfile />} />
          </Routes>
        </UserContextProvider>
      </div>
    </Router>
  );
}

export default App;
