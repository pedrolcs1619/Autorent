// src/components/BulkDeleteButton.tsx
import React from "react";
import { Trash2 } from "lucide-react";

interface BulkDeleteButtonProps {
  selecionadas: number[];
  onDelete: () => void;
}

const BulkDeleteButton: React.FC<BulkDeleteButtonProps> = ({
  selecionadas,
  onDelete,
}) => {
  if (selecionadas.length === 0) return null;

  const buttonStyle: React.CSSProperties = {
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

  const hoverStyle: React.CSSProperties = {
    backgroundColor: "#dc2626",
    transform: "translateY(-2px)",
  };

  // Para hover inline, usamos onMouseEnter / onMouseLeave
  const [hover, setHover] = React.useState(false);

  return (
    <button
      onClick={onDelete}
      style={{ ...buttonStyle, ...(hover ? hoverStyle : {}) }}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <Trash2 size={18} />
      Apagar {selecionadas.length} selecionada(s)
    </button>
  );
};

export default BulkDeleteButton;
