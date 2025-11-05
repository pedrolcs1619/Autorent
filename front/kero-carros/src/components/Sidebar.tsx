import React from "react";
import { Link, useNavigate } from "react-router-dom";
import * as S from "../styles/components/SidebarStyles";

const Sidebar: React.FC = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      const response = await fetch("http://localhost:8000/api/logout/", {
        method: "POST",
        credentials: "include",
      });

      if (response.ok) {
        localStorage.removeItem("access");
        localStorage.removeItem("refresh");
        navigate("/");
      } else {
        console.error("Erro ao fazer logout:", response.statusText);
      }
    } catch (error) {
      console.error("Erro ao se desconectar:", error);
    }
  };

  return (
    <div style={S.sidebar}>
      <h2 style={S.title}>KeroCarros</h2>
      <nav style={S.nav}>
        <Link to="/dashboard" style={S.link}>
          Dashboard
        </Link>
        <Link to="/cars" style={S.link}>
          Carros
        </Link>
        <Link to="/reservations" style={S.link}>
          Reservas
        </Link>
        <Link to="/clients" style={S.link}>
          Clientes
        </Link>
        <Link to="/categoria" style={S.link}>
          Categoria
        </Link>
        <button onClick={handleLogout} style={S.logoutButton}>
          Sair
        </button>
      </nav>
    </div>
  );
};

export default Sidebar;
