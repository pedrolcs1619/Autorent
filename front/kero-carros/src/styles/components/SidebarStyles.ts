import type { CSSProperties } from "react";

// Sidebar fixa
export const sidebar: CSSProperties = {
  width: "220px",
  height: "100vh",
  backgroundColor: "#1a73e8",
  color: "#fff",
  padding: "20px",
  boxSizing: "border-box",
  display: "flex",
  flexDirection: "column",
  position: "fixed", // sidebar fixa na tela
  top: 0,
  left: 0,
};

// Título dentro da sidebar
export const title: CSSProperties = {
  fontSize: "22px",
  fontWeight: "bold",
  marginBottom: "30px",
};

// Nav com links (rolagem interna se precisar)
export const nav: CSSProperties = {
  display: "flex",
  flexDirection: "column",
  gap: "15px",
  flex: 1, // ocupa espaço restante
  overflowY: "auto", // scroll se houver muitos links
  paddingRight: "5px",
};

// Links
export const link: CSSProperties = {
  color: "#fff",
  textDecoration: "none",
  fontSize: "16px",
  padding: "5px 0",
  transition: "color 0.3s, transform 0.2s",
  cursor: "pointer",
};

export const linkHover: CSSProperties = {
  color: "#e0e0e0",
  transform: "scale(1.05)",
};

// Logout sempre no final da sidebar
export const logoutButton: CSSProperties = {
  marginTop: "auto", // empurra o botão para o final
  backgroundColor: "#ff4444",
  color: "#fff",
  border: "none",
  padding: "10px 15px",
  borderRadius: "8px",
  fontWeight: "bold",
  cursor: "pointer",
  transition: "background-color 0.3s, transform 0.2s",
  width: "100%", // ocupa a largura da sidebar
};

export const logoutButtonHover: CSSProperties = {
  backgroundColor: "#ff2222",
  transform: "scale(1.05)",
};
