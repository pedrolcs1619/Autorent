import type { CSSProperties } from "react";

export const card: CSSProperties = {
  position: "relative",
  backgroundColor: "#fff",
  borderRadius: "1rem",
  padding: "1.5rem",
  boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
  border: "1px solid #f3f4f6",
  transition: "all 0.3s ease",
};

export const cardSelected: CSSProperties = {
  ring: "2px solid #60a5fa", // ring-blue-400
};

export const checkbox: CSSProperties = {
  width: "1.25rem",
  height: "1.25rem",
  accentColor: "#2563eb",
};

export const cardHeader: CSSProperties = {
  display: "flex",
  alignItems: "center",
  gap: "0.75rem",
  marginBottom: "1rem",
};

export const iconWrapper: CSSProperties = {
  backgroundColor: "#dbeafe", // blue-100
  padding: "0.75rem",
  borderRadius: "0.75rem",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
};

export const details: CSSProperties = {
  color: "#4b5563", // gray-600
  fontSize: "0.875rem",
  lineHeight: "1.25rem",
  marginBottom: "1rem",
};

export const editButton: CSSProperties = {
  position: "absolute",
  bottom: "0.75rem",
  right: "0.75rem",
  backgroundColor: "#facc15", // yellow-400
  color: "#fff",
  padding: "0.375rem 0.75rem",
  borderRadius: "0.5rem",
  display: "flex",
  alignItems: "center",
  gap: "0.25rem",
  fontSize: "0.875rem",
  cursor: "pointer",
  boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
  transition: "background-color 0.2s ease",
};

export const editButtonHover: CSSProperties = {
  backgroundColor: "#eab308", // yellow-500
};
