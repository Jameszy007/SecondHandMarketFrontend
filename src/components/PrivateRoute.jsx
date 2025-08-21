import React from "react";
import { Navigate, useLocation } from "react-router-dom";

export default function PrivateRoute({ children }) {
  const authed = Boolean(localStorage.getItem("token")); // 之后可切 /api/me
  const loc = useLocation();
  if (!authed) return <Navigate to="/login" state={{ from: loc.pathname }} replace />;
  return children;
}
