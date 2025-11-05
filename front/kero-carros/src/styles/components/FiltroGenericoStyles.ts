import { CSSProperties } from "react";

export const containerStyle: CSSProperties = {
  backgroundColor: "#fff",
  boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
  borderRadius: "1rem", // rounded-2xl
  padding: "1.5rem",
  marginBottom: "1.5rem",
  display: "flex",
  flexWrap: "wrap",
  gap: "1rem",
  alignItems: "flex-end",
  border: "1px solid #E5E7EB", // border-gray-200
};

export const fieldWrapperStyle: CSSProperties = {
  display: "flex",
  flexDirection: "column",
  width: "100%",
  maxWidth: "200px",
};

export const labelStyle: CSSProperties = {
  fontSize: "0.875rem",
  fontWeight: 600,
  color: "#374151", // text-gray-700
  marginBottom: "0.25rem",
};

export const inputStyle: CSSProperties = {
  border: "1px solid #D1D5DB", // border-gray-300
  borderRadius: "1rem", // rounded-xl
  padding: "0.5rem 0.75rem",
  outline: "none",
  boxShadow: "0 1px 2px rgba(0,0,0,0.05)",
};

export const selectStyle: CSSProperties = {
  ...inputStyle,
  appearance: "none",
};

export const buttonGroupStyle: CSSProperties = {
  display: "flex",
  gap: "0.75rem",
  marginTop: "0.5rem",
};

export const filterButtonStyle: CSSProperties = {
  backgroundImage: "linear-gradient(to right, #3b82f6, #2563eb)", // from-blue-500 to-blue-600
  color: "#fff",
  padding: "0.5rem 1.25rem",
  borderRadius: "1rem",
  fontWeight: 600,
  cursor: "pointer",
  boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
  transition: "all 0.3s ease",
};

export const clearButtonStyle: CSSProperties = {
  backgroundImage: "linear-gradient(to right, #9CA3AF, #6B7280)", // from-gray-400 to-gray-500
  color: "#fff",
  padding: "0.5rem 1.25rem",
  borderRadius: "1rem",
  fontWeight: 600,
  cursor: "pointer",
  boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
  transition: "all 0.3s ease",
};
