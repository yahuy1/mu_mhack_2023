import React from "react"
import { Route, Navigate } from "react-router-dom"
import { useUserContext } from "../../Controllers/userContext"

export default function PrivateRoute({ component: Component, ...rest }) {
  const { user } = useUserContext();

  return (
    <Route
      {...rest}
      render={props => {
        return user ? <Component {...props} /> : <Navigate to="/login" />
      }}
    ></Route>
  )
}