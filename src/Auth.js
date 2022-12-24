import Cookies from "js-cookie";
import React from "react";
import { Navigate } from "react-router-dom";

const Auth = (props) => {
  if (Cookies.get("token") !== undefined) {
    return <Navigate to="/dashboard" />;
  } else if (Cookies.get("token") === undefined) {
    return props.children;
  }
};

const AuthDashboard = (props) => {
  if (Cookies.get("token") !== undefined) {
    return props.children;
  } else if (Cookies.get("token") === undefined) {
    return <Navigate to="/login" />;
  }
};

export { Auth, AuthDashboard };
