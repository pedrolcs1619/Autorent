import type { CSSProperties } from "react";

// Fundo do modal
export const overlay: CSSProperties = {
  position: "fixed",
  inset: 0,
  zIndex: 50,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  backgroundColor: "rgba(0,0,0,0.5)",
  backdropFilter: "blur(4px)",
};

// Container do modal
export const modalContainer: CSSProperties = {
  position: "relative",
  width: "100%",
  maxWidth: "32rem", // 512px
  backgroundColor: "#fff",
  borderRadius: "1rem",
  padding: "2rem",
  boxShadow: "0 10px 25px rgba(0,0,0,0.2)",
  border: "1px solid #f3f4f6",
};

// Botão de fechar
export const closeButton: CSSProperties = {
  position: "absolute",
  top: "0.75rem",
  right: "0.75rem",
  color: "#6b7280",
  cursor: "pointer",
  background: "none",
  border: "none",
  transition: "color 0.2s",
};

// Título do modal
export const tituloModal: CSSProperties = {
  fontSize: "1.5rem",
  fontWeight: 700,
  color: "#1e40af",
  marginBottom: "1.5rem",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  gap: "0.5rem",
};

// Labels dos campos
export const label: CSSProperties = {
  display: "block",
  color: "#374151",
  fontWeight: 600,
  marginBottom: "0.25rem",
};

// Inputs e selects
export const input: CSSProperties = {
  width: "100%",
  padding: "0.5rem 0.75rem",
  border: "1px solid #d1d5db",
  borderRadius: "0.75rem",
  marginBottom: "0.75rem",
};

// Botão de submit
export const submitButton: CSSProperties = {
  width: "100%",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  gap: "0.5rem",
  background: "linear-gradient(to right, #3b82f6, #2563eb)",
  color: "#fff",
  padding: "0.75rem 1.5rem",
  borderRadius: "1rem",
  fontWeight: 600,
  cursor: "pointer",
  boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
  transition: "all 0.3s",
};
