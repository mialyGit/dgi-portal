import React from "react";
import { Route } from "react-router-dom";
import { useAuth } from "auth-context/auth.context";
import { Redirect } from "react-router-dom";

export const ProtectedRoute = ({ ...rest }) => {
  let { userSession } = useAuth();
  if (!userSession || !userSession.token || userSession.token === "") {
    return (
      <Redirect to="/" />
    );
  }

  return <Route {...rest} />;
};
