import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { useUserContext } from "../../Controllers/userContext";
import Feed from "../Feed/Feed";

export default function ProtectedRoute({ component: Component, ...rest }) {
  const { user, loading } = useUserContext();
  console.log("xxx.inside-protected-route" + user);
  return (
    loading? <h2> Loading </h2> : user ? <Feed/> : <Navigate to="/log_in" />
  )
}