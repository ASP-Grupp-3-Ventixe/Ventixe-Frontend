import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

const AdminRoute = ({ children }) => {
  const { isAuthenticated, isAdmin, loading } = useAuth();

  if (loading) return <div>Loading...</div>;

  if (isAuthenticated) {
    if (isAdmin) return children;
    return <Navigate to="/denied" replace />;
  }

    // if not logged in, redirect to login
  return <Navigate to="/login" replace />;
};

export default AdminRoute
