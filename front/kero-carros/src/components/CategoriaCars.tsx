import React from "react";

interface CategoriaCardProps {
  id: number;
  nome: string;
  descricao: string;
  diaria_base: string;
}

const CategoriaCard: React.FC<CategoriaCardProps> = ({
  id,
  nome,
  descricao,
  diaria_base,
}) => {
  return (
    <div className="bg-white shadow-md rounded-xl p-5 border border-gray-200 hover:shadow-xl transition cursor-pointer">
      <h2 className="text-xl font-bold text-blue-600 mb-2">{nome}</h2>
      <p className="text-gray-600 mb-2">{descricao}</p>
      <p className="text-gray-800 font-semibold">Diária: R$ {diaria_base}</p>
    </div>
  );
};

export default CategoriaCard;
