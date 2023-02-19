import React from "react";
import { Navigate } from "react-router-dom";
import { useUserContext } from "../../Controllers/userContext";
import Feed from "../Feed/Feed";

export default function ProtectedRouteFeed({ component: Component, ...rest }) {
  const { user, loading } = useUserContext();
  console.log("xxx.inside-protected-route" + user);
  return (
    user ? <Feed/> : <Navigate to="/log_in" />
  )
}