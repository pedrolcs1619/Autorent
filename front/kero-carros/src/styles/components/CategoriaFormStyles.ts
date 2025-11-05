import type { CSSProperties } from "react";

// Overlay do modal
export const overlayStyle: CSSProperties = {
  position: "fixed",
  inset: 0,
  backgroundColor: "rgba(0, 0, 0, 0.5)",
  backdropFilter: "blur(4px)",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  zIndex: 50,
};

// Container do modal
export const modalContainerStyle: CSSProperties = {
  position: "relative",
  width: "100%",
  maxWidth: "32rem",
  backgroundColor: "#fff",
  borderRadius: "1rem",
  padding: "2rem",
  border: "1px solid #f3f4f6",
  boxShadow: "0 10px 25px rgba(0,0,0,0.1)",
  animation: "scaleIn 0.3s ease",
};

// Botão de fechar
export const closeButtonStyle: CSSProperties = {
  position: "absolute",
  top: "0.75rem",
  right: "0.75rem",
  color: "#6b7280",
  cursor: "pointer",
  background: "none",
  border: "none",
  transition: "color 0.2s",
};

// Título
export const titleStyle: CSSProperties = {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  gap: "0.5rem",
  fontSize: "1.5rem",
  fontWeight: 700,
  color: "#1d4ed8",
  marginBottom: "1.5rem",
};

// Wrapper dos inputs com ícone
export const inputWrapperStyle: CSSProperties = {
  display: "flex",
  alignItems: "center",
  gap: "0.5rem",
  border: "1px solid #d1d5db",
  borderRadius: "0.75rem",
  padding: "0.5rem 0.75rem",
  boxShadow: "0 1px 3px rgba(0,0,0,0.05)",
  transition: "all 0.2s ease-in-out",
};

// Input
export const inputStyle: CSSProperties = {
  flex: 1,
  outline: "none",
  color: "#1f2937",
  fontSize: "1rem",
  border: "none",
  backgroundColor: "transparent",
};

// Form group (cada campo)
export const formGroupStyle: CSSProperties = {
  marginBottom: "1rem",
  display: "flex",
  flexDirection: "column",
};

// Botão de submit
export const submitButtonStyle: CSSProperties = {
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
  fontSize: "1rem",
  boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
  cursor: "pointer",
  transition: "all 0.3s ease",
};
