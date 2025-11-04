// src/routes/ProtectedLayout.tsx
import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import Sidebar from "../components/Sidebar";

interface Props {
  children: React.ReactNode;
}

const ProtectedLayout: React.FC<Props> = ({ children }) => {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  return (
    <div style={styles.container}>
      <Sidebar />
      <main style={styles.main}>{children}</main>
    </div>
  );
};

const styles: { [key: string]: React.CSSProperties } = {
  container: {
    display: "flex",
    minHeight: "100vh",
    width: "100vw",
  },
  main: {
    flex: 1, // ocupa todo espaço restante
    minHeight: "100vh",
    padding: "20px",
    boxSizing: "border-box",
    backgroundColor: "#f4f4f4", // mesma cor do container antes
  },
};

export default ProtectedLayout;
