import type{ CSSProperties } from "react";

export const container: CSSProperties = {
  display: "flex",
  flexDirection: "column",
  marginBottom: "15px",
};

export const label: CSSProperties = {
  fontSize: "14px",
  color: "#333",
  marginBottom: "5px",
  textAlign: "left",
};

export const input: CSSProperties = {
  padding: "10px",
  border: "1px solid #ccc",
  borderRadius: "8px",
  fontSize: "16px",
  outline: "none",
  transition: "border 0.2s ease, box-shadow 0.2s ease",
};

export const inputFocus: CSSProperties = {
  border: "1px solid #3b82f6",
  boxShadow: "0 0 0 2px rgba(59, 130, 246, 0.2)",
};
