// src/pages/CategoriaPage.tsx
import React, { useEffect, useState } from "react";
import { listarCategorias } from "../services/CategoriaService";
import type { Categoria } from "../types/categoria";
import CategoriaForm from "../components/CategoriaForms";
import CategoriaList from "../components/CategoriaList";

const CategoriaPage: React.FC = () => {
  const [categorias, setCategorias] = useState<Categoria[]>([]);

  const carregarCategorias = async () => {
    try {
      const data = await listarCategorias();
      setCategorias(data);
    } catch (error) {
      console.error("Erro ao carregar categorias:", error);
    }
  };

  useEffect(() => {
    carregarCategorias();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 p-10">
      <h1 className="text-3xl font-extrabold text-blue-700 mb-10 text-center">
        Categorias de Veículos
      </h1>

      <CategoriaList categorias={categorias} />

      <div className="mt-10">
        <CategoriaForm onCategoriaAdicionada={carregarCategorias} />
      </div>
    </div>
  );
};

export default CategoriaPage;
