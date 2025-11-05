import type{ CSSProperties } from "react";

export const containerStyle: CSSProperties = {
  display: "grid",
  gap: "2rem",
  gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
  marginBottom: "2.5rem",
};

export const cardStyle: CSSProperties = {
  position: "relative",
  backgroundColor: "#fff",
  borderRadius: "1rem", // rounded-2xl
  padding: "1.5rem",
  boxShadow: "0 4px 6px rgba(0,0,0,0.1)", // shadow-md
  border: "1px solid #f3f4f6", // border-gray-100
  transition: "all 0.3s ease",
};

export const selectedCardStyle: CSSProperties = {
  ring: "2px solid #60a5fa", // ring-2 ring-blue-400
};

export const checkboxWrapperStyle: CSSProperties = {
  position: "absolute",
  top: "0.75rem",
  right: "0.75rem",
  display: "flex",
  alignItems: "center",
};

export const headerStyle: CSSProperties = {
  display: "flex",
  alignItems: "center",
  gap: "0.75rem",
  marginBottom: "1rem",
};

export const iconWrapperStyle: CSSProperties = {
  backgroundColor: "#DBEAFE", // bg-blue-100
  padding: "0.75rem",
  borderRadius: "0.75rem",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
};

export const descriptionStyle: CSSProperties = {
  color: "#4B5563", // text-gray-600
  fontSize: "0.875rem",
  lineHeight: "1.25rem",
  marginBottom: "1rem",
};

export const footerStyle: CSSProperties = {
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  paddingTop: "0.75rem",
  borderTop: "1px solid #f3f4f6",
};

export const priceStyle: CSSProperties = {
  display: "flex",
  alignItems: "center",
  gap: "0.25rem",
  color: "#374151", // text-gray-700
  fontWeight: 600,
};

export const editButtonStyle: CSSProperties = {
  position: "absolute",
  bottom: "0.75rem",
  right: "0.75rem",
  backgroundColor: "#facc15", // bg-yellow-400
  color: "#fff",
  padding: "0.375rem 0.75rem",
  borderRadius: "0.5rem",
  display: "flex",
  alignItems: "center",
  gap: "0.25rem",
  fontSize: "0.875rem",
  cursor: "pointer",
  boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
  transition: "all 0.2s ease",
};

export const emptyMessageStyle: CSSProperties = {
  textAlign: "center",
  color: "#6B7280", // text-gray-500
  fontStyle: "italic",
  marginTop: "2.5rem",
};
