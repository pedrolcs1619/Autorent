import React from "react";
import type { Categoria } from "../types/categoria";
import { Car, DollarSign, Edit3 } from "lucide-react";
import * as S from "../styles/components/CategoriaListStyles";

interface CategoriaListProps {
  categorias: Categoria[];
  selecionadas: number[];
  setSelecionadas: React.Dispatch<React.SetStateAction<number[]>>;
  onEdit?: (categoria: Categoria) => void;
}

const CategoriaList: React.FC<CategoriaListProps> = ({
  categorias,
  selecionadas,
  setSelecionadas,
  onEdit,
}) => {
  const toggleSelecionar = (id: number) => {
    setSelecionadas((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  if (!categorias.length) {
    return (
      <p style={S.emptyMessageStyle}>Nenhuma categoria cadastrada ainda.</p>
    );
  }

  return (
    <div style={S.containerStyle}>
      {categorias.map((cat) => (
        <div
          key={cat.id}
          style={{
            ...S.cardStyle,
            ...(selecionadas.includes(cat.id) ? S.selectedCardStyle : {}),
          }}
        >
          <label style={S.checkboxWrapperStyle}>
            <input
              type="checkbox"
              checked={selecionadas.includes(cat.id)}
              onChange={() => toggleSelecionar(cat.id)}
              className="w-5 h-5 accent-blue-600"
            />
            <span className="sr-only">Selecionar {cat.nome}</span>
          </label>

          <div style={S.headerStyle}>
            <div style={S.iconWrapperStyle}>
              <Car size={24} className="text-blue-600" />
            </div>
            <h2 className="text-lg font-semibold text-gray-800">{cat.nome}</h2>
          </div>

          <p style={S.descriptionStyle}>{cat.descricao}</p>

          <div style={S.footerStyle}>
            <div style={S.priceStyle}>
              <DollarSign className="text-green-500" size={18} />
              <span>R$ {Number(cat.diaria_base).toFixed(2)}</span>
            </div>
            <span className="text-xs text-gray-400">ID #{cat.id}</span>
          </div>

          {onEdit && (
            <button style={S.editButtonStyle} onClick={() => onEdit(cat)}>
              <Edit3 size={16} />
              Editar
            </button>
          )}
        </div>
      ))}
    </div>
  );
};

export default CategoriaList;
