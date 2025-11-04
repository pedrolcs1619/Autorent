// src/components/BulkEditButton.tsx
import React from "react";
import { Edit2 } from "lucide-react";

interface BulkEditButtonProps {
  selecionadas: number[];
  onEdit: () => void;
}

const BulkEditButton: React.FC<BulkEditButtonProps> = ({
  selecionadas,
  onEdit,
}) => {
  if (selecionadas.length === 0) return null;

  const buttonStyle: React.CSSProperties = {
    display: "flex",
    alignItems: "center",
    gap: "0.5rem",
    backgroundColor: "#f2b83bff", // azul
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
    backgroundColor: "#edb200ff",
    transform: "translateY(-2px)",
  };

  const [hover, setHover] = React.useState(false);

  return (
    <button
      onClick={onEdit}
      style={{ ...buttonStyle, ...(hover ? hoverStyle : {}) }}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <Edit2 size={18} />
      Editar {selecionadas.length} selecionada(s)
    </button>
  );
};

export default BulkEditButton;
