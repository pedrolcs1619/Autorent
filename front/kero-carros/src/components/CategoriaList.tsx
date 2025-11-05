import React from "react";
import type { Categoria } from "../types/categoria";
import { Car, DollarSign, Edit3 } from "lucide-react";

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
      <p className="text-center text-gray-500 italic mt-10">
        Nenhuma categoria cadastrada ainda.
      </p>
    );
  }

  return (
    <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 mb-10">
      {categorias.map((cat) => (
        <div
          key={cat.id}
          className={`relative bg-white rounded-2xl p-6 shadow-md hover:shadow-xl transform transition-all border border-gray-100 ${
            selecionadas.includes(cat.id) ? "ring-2 ring-blue-400" : ""
          }`}
        >
          {/* Checkbox de seleção */}
          <label className="absolute top-3 right-3 flex items-center">
            <input
              type="checkbox"
              checked={selecionadas.includes(cat.id)}
              onChange={() => toggleSelecionar(cat.id)}
              className="w-5 h-5 accent-blue-600"
            />
            <span className="sr-only">Selecionar {cat.nome}</span>
          </label>

          {/* Cabeçalho com ícone */}
          <div className="flex items-center gap-3 mb-4">
            <div className="bg-blue-100 p-3 rounded-xl">
              <Car className="text-blue-600" size={24} />
            </div>
            <h2 className="text-lg font-semibold text-gray-800">{cat.nome}</h2>
          </div>

          {/* Descrição */}
          <p className="text-gray-600 text-sm leading-relaxed mb-4">
            {cat.descricao}
          </p>

          {/* Rodapé */}
          <div className="flex items-center justify-between mt-4 pt-3 border-t border-gray-100">
            <div className="flex items-center gap-1 text-gray-700 font-semibold">
              <DollarSign className="text-green-500" size={18} />
              <span>R$ {Number(cat.diaria_base).toFixed(2)}</span>
            </div>
            <span className="text-xs text-gray-400">ID #{cat.id}</span>
          </div>

          {/* Botão Editar */}
          {onEdit && (
            <button
              onClick={() => onEdit(cat)}
              className="absolute bottom-3 right-3 bg-yellow-400 hover:bg-yellow-500 text-white px-3 py-1.5 rounded-lg text-sm flex items-center gap-1 shadow-md transition"
            >
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
