import React from "react";
import { Link, useNavigate } from "react-router-dom";

const Sidebar: React.FC = () => {
  const navigate = useNavigate();

  // Função de logout
  const handleLogout = async () => {
    try {
      const response = await fetch("http://localhost:8000/api/logout/", {
        method: "POST",
        credentials: "include", // envia cookies
      });

      if (response.ok) {
        // Limpa tokens ou dados locais
        localStorage.removeItem("access");
        localStorage.removeItem("refresh");

        // Redireciona para tela de login
        navigate("/");
      } else {
        console.error("Erro ao fazer logout:", response.statusText);
      }
    } catch (error) {
      console.error("Erro ao se desconectar:", error);
    }
  };

  return (
    <div style={styles.sidebar}>
      <h2 style={styles.title}>KeroCarros</h2>
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

        {/* Botão de logout */}
        <button onClick={handleLogout} style={styles.logoutButton}>
          Sair
        </button>
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
    display: "flex",
    flexDirection: "column",
  },
  title: {
    fontSize: "22px",
    fontWeight: "bold",
    marginBottom: "30px",
  },
  nav: {
    display: "flex",
    flexDirection: "column",
    gap: "15px",
    flex: 1,
  },
  link: {
    color: "#fff",
    textDecoration: "none",
    fontSize: "16px",
    padding: "5px 0",
    transition: "color 0.3s",
  },
  logoutButton: {
    marginTop: "auto",
    backgroundColor: "#ff4444",
    color: "#fff",
    border: "none",
    padding: "10px 15px",
    borderRadius: "8px",
    fontWeight: "bold",
    cursor: "pointer",
    transition: "background-color 0.3s",
  },
};

// Hover efeito via inline style não funciona, então você pode usar CSS global ou classes Tailwind
// Exemplo com classe Tailwind: "hover:bg-red-600"

export default Sidebar;
