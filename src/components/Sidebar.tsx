import React from "react";
import { Link } from "react-router-dom";

const Sidebar: React.FC = () => {
  return (
    <div style={styles.sidebar}>
      <h2>KeroCarros</h2>
      <nav style={styles.nav}>
        <Link to="/dashboard" style={styles.link}>
          Dashboard
        </Link>
        <Link to="/cars" style={styles.link}>
          Carros
        </Link>
        <Link to="/reservations" style={styles.link}>
          Reservas
        </Link>
        <Link to="/clients" style={styles.link}>
          Clientes
        </Link>
        <Link to="/categoria" style={styles.link}>
          Categoria
        </Link>
      </nav>
    </div>
  );
};

const styles: { [key: string]: React.CSSProperties } = {
  sidebar: {
    width: "220px",
    minHeight: "100vh",
    backgroundColor: "#1a73e8",
    color: "#fff",
    padding: "20px",
    boxSizing: "border-box",
  },
  nav: {
    marginTop: "30px",
    display: "flex",
    flexDirection: "column",
    gap: "15px",
  },
  link: {
    color: "#fff",
    textDecoration: "none",
    fontSize: "16px",
  },
};

export default Sidebar;
