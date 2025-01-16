import React from "react";
import { Navigate } from "react-router-dom";
import LoadingSpinner from "../common/LoadingSpinner";
import { useAuth } from "../../contexts/auth/AuthContext";

const ProtectedRoute = ({ children }) => {
  const { user, isLoading } = useAuth().state;

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute;
