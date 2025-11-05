import React, { type JSX } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

const ProtectedRoute: React.FC<{ children: JSX.Element }> = ({ children }) => {
  const { isAuthenticated, loading } = useAuth();

  if (loading)
    return (
      <div className="flex items-center justify-center h-screen bg-gray-50">
        <div className="flex flex-col items-center">
          <div className="w-16 h-16 border-4 border-blue-500 border-dashed rounded-full animate-spin mb-4"></div>
          <span className="text-blue-600 font-semibold text-lg">
            Carregando...
          </span>
        </div>
      </div>
    );

  return isAuthenticated ? children : <Navigate to="/" replace />;
};

export default ProtectedRoute;
