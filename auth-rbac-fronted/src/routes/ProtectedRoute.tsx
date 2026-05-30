import { Navigate } from "react-router-dom";
import { getRole, isLoggedIn } from "../utils/auth";
import React from "react";

interface Props {
  children: React.ReactNode;
  allowedRoles: string[];
}

const ProtectedRoute: React.FC<Props> = ({ children, allowedRoles }) => {
  const token = isLoggedIn();
  const role = getRole();

  if (!token) {
    return <Navigate to="/" />;
  }

  if (!role || !allowedRoles.includes(role)) {
    return <Navigate to="/public-home" />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;