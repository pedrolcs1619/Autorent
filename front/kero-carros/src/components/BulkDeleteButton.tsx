import React from "react";
import { Trash2 } from "lucide-react";
import {
  buttonStyle,
  hoverStyle,
} from "../styles/components/BulkDeleteButtonStyles";

interface BulkDeleteButtonProps {
  selecionadas: number[];
  onDelete: () => void;
}

const BulkDeleteButton: React.FC<BulkDeleteButtonProps> = ({
  selecionadas,
  onDelete,
}) => {
  const [hover, setHover] = React.useState(false);

  if (selecionadas.length === 0) return null;

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
