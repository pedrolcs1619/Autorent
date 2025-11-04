// src/components/CategoriaList.tsx
import React from "react";
import type { Categoria } from "../types/categoria";
import { Car, DollarSign } from "lucide-react";

interface CategoriaListProps {
  categorias: Categoria[];
}

const CategoriaList: React.FC<CategoriaListProps> = ({ categorias }) => {
  console.log("Categorias recebidas:", categorias);
  if (!categorias.length) {
    return (
      <p className="text-center text-gray-600 italic mt-10">
        Nenhuma categoria cadastrada ainda.
      </p>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-10">
      {categorias.map((cat) => (
        <div
          key={cat.id}
          className="bg-white rounded-3xl p-6 shadow-md hover:shadow-lg transition-all border border-blue-100 hover:border-blue-300"
        >
          <div className="flex items-center gap-3 mb-3">
            <div className="bg-blue-100 p-3 rounded-full">
              <Car className="text-blue-600" size={24} />
            </div>
            <h2 className="text-xl font-semibold text-blue-700">{cat.nome}</h2>
          </div>

          <p className="text-gray-600 mb-3">{cat.descricao}</p>

          <div className="flex items-center justify-between mt-4">
            <div className="flex items-center gap-1 text-gray-700 font-semibold">
              <DollarSign className="text-green-500" size={18} />
              <span>R$ {Number(cat.diaria_base).toFixed(2)}</span>
            </div>
            <span className="text-sm text-gray-400">ID: {cat.id}</span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CategoriaList;
