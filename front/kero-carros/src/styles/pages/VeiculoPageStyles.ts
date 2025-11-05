import type { CSSProperties } from "react";

// Container principal da página
export const container: CSSProperties = {
  minHeight: "100vh",
  padding: "40px",
  paddingLeft: "260px", // espaço para sidebar fixa de 220px + padding
  background: "linear-gradient(to bottom right, #ebf8ff, #dbeafe)",
};

// Título da página
export const titulo: CSSProperties = {
  fontSize: "2rem",
  fontWeight: 800,
  color: "#1d4ed8",
  marginBottom: "24px",
  textAlign: "center",
};

// Botão de abrir/fechar formulário
export const botaoAdicionar: CSSProperties = {
  background: "linear-gradient(to right, #3b82f6, #2563eb)",
  color: "#fff",
  padding: "12px 24px",
  borderRadius: "16px",
  fontWeight: 600,
  cursor: "pointer",
  boxShadow: "0 4px 10px rgba(0,0,0,0.15)",
  transition: "all 0.3s",
  marginBottom: "16px",
};

export const botaoAdicionarHover: CSSProperties = {
  background: "linear-gradient(to right, #2563eb, #1e40af)",
  boxShadow: "0 6px 12px rgba(0,0,0,0.2)",
};

// Container dos filtros
export const filtroContainer: CSSProperties = {
  marginBottom: "16px",
};

// Container do BulkDelete
export const bulkDeleteContainer: CSSProperties = {
  margin: "16px 0",
  display: "flex",
  justifyContent: "start",
};
