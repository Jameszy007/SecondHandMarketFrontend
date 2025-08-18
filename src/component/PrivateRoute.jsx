import React, { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const PrivateRoute = () => {
  // const { authed } = useContext(AuthContext);

  // return authed ? <Outlet /> : <Navigate to="/login" />;
  return <Outlet />;
};

export default PrivateRoute;
