import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import Sidebar from "./Sidebar";
import * as S from "../styles/components/ProtectedLayoutStyles";

interface Props {
  children: React.ReactNode;
}

const ProtectedLayout: React.FC<Props> = ({ children }) => {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  return (
    <div style={S.container}>
      <Sidebar />
      <main style={S.main}>{children}</main>
    </div>
  );
};

export default ProtectedLayout;
