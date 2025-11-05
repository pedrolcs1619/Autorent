import React, { useState } from "react";
import { Edit2 } from "lucide-react";
import * as S from "../styles/components/BulkEditButtonStyles";

interface BulkEditButtonProps {
  selecionadas: number[];
  onEdit: () => void;
}

const BulkEditButton: React.FC<BulkEditButtonProps> = ({
  selecionadas,
  onEdit,
}) => {
  const [hover, setHover] = useState(false);

  if (selecionadas.length === 0) return null;

  return (
    <button
      onClick={onEdit}
      style={{ ...S.buttonStyle, ...(hover ? S.hoverStyle : {}) }}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <Edit2 size={18} />
      Editar {selecionadas.length} selecionada(s)
    </button>
  );
};

export default BulkEditButton;
