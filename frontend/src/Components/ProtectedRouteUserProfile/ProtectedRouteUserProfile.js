import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { useUserContext } from "../../Controllers/userContext";
import UserProfile from "../UserPage/UserProfile";

export default function ProtectedRouteUserProfile({ component: Component, ...rest }) {
  const { user, loading } = useUserContext();
  console.log("xxx.inside-protected-route" + user);
  return (
    loading? <h2> Loading </h2> : user ? <UserProfile/> : <Navigate to="/log_in" />
  )
}