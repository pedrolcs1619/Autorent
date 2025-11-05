import type { CSSProperties } from "react";

// Estilo padrão do botão
export const buttonStyle: CSSProperties = {
  display: "flex",
  alignItems: "center",
  gap: "0.5rem",
  backgroundColor: "#f2b83b",
  color: "#fff",
  padding: "0.5rem 1rem",
  borderRadius: "0.5rem",
  fontWeight: 600,
  cursor: "pointer",
  boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
  transition: "background-color 0.3s ease, transform 0.2s ease",
  border: "none",
};

// Estilo quando hover
export const hoverStyle: CSSProperties = {
  backgroundColor: "#edb200",
  transform: "translateY(-2px)",
};
