import React from "react";
import CategoriaCard from "./CategoriaCars";

// Interface exportada para uso na página
export interface Categoria {
  id: number;
  nome: string;
  descricao: string;
  diaria_base: string;
}

interface CategoriaListProps {
  categorias: Categoria[];
}

const CategoriaList: React.FC<CategoriaListProps> = ({ categorias }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-4">
      {categorias.map((categoria) => (
        <CategoriaCard
          key={categoria.id}
          id={categoria.id}
          nome={categoria.nome}
          descricao={categoria.descricao}
          diaria_base={categoria.diaria_base}
        />
      ))}
    </div>
  );
};

export default CategoriaList;
