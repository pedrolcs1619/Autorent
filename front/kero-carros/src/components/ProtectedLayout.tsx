import React from "react";
import Sidebar from "./Sidebar";

interface Props {
  children: React.ReactNode;
}

const ProtectedLayout: React.FC<Props> = ({ children }) => {
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
    height: "100vh",
    width: "100vw",
  },
  main: {
    flex: 1,
    padding: "20px",
    overflowY: "auto",
    backgroundColor: "#f4f4f4",
  },
};

export default ProtectedLayout;
