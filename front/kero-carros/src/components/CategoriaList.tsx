import React from "react";
import type { Categoria } from "../types/categoria";
import { Car, DollarSign } from "lucide-react";

interface CategoriaListProps {
  categorias: Categoria[];
  selecionadas: number[]; // ids selecionados
  setSelecionadas: (ids: number[]) => void;
}

const CategoriaList: React.FC<CategoriaListProps> = ({
  categorias,
  selecionadas,
  setSelecionadas,
}) => {
  if (!categorias.length) {
    return (
      <p className="text-center text-gray-500 italic mt-10">
        Nenhuma categoria cadastrada ainda.
      </p>
    );
  }

  const toggleSelecionada = (id: number) => {
    if (selecionadas.includes(id)) {
      setSelecionadas(selecionadas.filter((sid) => sid !== id));
    } else {
      setSelecionadas([...selecionadas, id]);
    }
  };

  return (
    <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 mb-10">
      {categorias.map((cat) => (
        <div
          key={cat.id}
          className={`relative bg-white rounded-2xl p-6 shadow-md hover:shadow-xl transform transition-all border border-gray-100 ${
            selecionadas.includes(cat.id) ? "ring-2 ring-blue-400" : ""
          }`}
        >
          {/* Checkbox para seleção */}
          <label className="absolute top-3 right-3 flex items-center">
            <input
              type="checkbox"
              checked={selecionadas.includes(cat.id)}
              onChange={() => toggleSelecionada(cat.id)}
              className="w-5 h-5"
            />
            <span className="sr-only">Selecionar {cat.nome}</span>
          </label>

          {/* Cabeçalho */}
          <div className="flex items-center gap-3 mb-4">
            <div className="bg-blue-100 p-3 rounded-xl group-hover:bg-blue-200 transition-colors">
              <Car className="text-blue-600" size={24} />
            </div>
            <h2 className="text-lg font-semibold text-gray-800 group-hover:text-blue-700 transition-colors">
              {cat.nome}
            </h2>
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
        </div>
      ))}
    </div>
  );
};

export default CategoriaList;
