import type{ CSSProperties } from "react";

export const buttonStyle: CSSProperties = {
  display: "flex",
  alignItems: "center",
  gap: "0.5rem",
  backgroundColor: "#ef4444", // vermelho
  color: "#fff",
  padding: "0.5rem 1rem",
  borderRadius: "0.5rem",
  fontWeight: 600,
  cursor: "pointer",
  boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
  transition: "background-color 0.3s ease, transform 0.2s ease",
  border: "none",
};

export const hoverStyle: CSSProperties = {
  backgroundColor: "#dc2626",
  transform: "translateY(-2px)",
};
