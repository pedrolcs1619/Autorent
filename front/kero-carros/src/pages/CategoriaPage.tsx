// src/pages/CategoriaPage.tsx
import React, { useEffect, useState } from "react";
import {
  listarCategorias,
  apagarCategoria,
} from "../services/CategoriaService";
import type { Categoria } from "../types/categoria";
import CategoriaForm from "../components/CategoriaForms";
import CategoriaList from "../components/CategoriaList";
import FiltroGenerico from "../components/FiltroComponent";
import BulkDeleteButton from "../components/BulkDeleteButton";

const CategoriaPage: React.FC = () => {
  const [categorias, setCategorias] = useState<Categoria[]>([]);
  const [selecionadas, setSelecionadas] = useState<number[]>([]);
  const [filtros, setFiltros] = useState<Record<string, string>>({});
  const [mostrarForm, setMostrarForm] = useState(false);

  const carregarCategorias = async () => {
    try {
      const data = await listarCategorias();
      setCategorias(data);
      setSelecionadas([]); // limpa seleção ao recarregar
    } catch (error) {
      console.error("Erro ao carregar categorias:", error);
    }
  };

  useEffect(() => {
    carregarCategorias();
  }, []);

  const handleFiltrar = (valores: Record<string, string>) => {
    setFiltros(valores);
  };

  const categoriasFiltradas = categorias.filter((cat) => {
    const nomeFiltro = filtros.nome?.toLowerCase() || "";
    const precoMin = parseFloat(filtros.precoMin) || 0;
    const precoMax = parseFloat(filtros.precoMax) || Infinity;

    return (
      cat.nome.toLowerCase().includes(nomeFiltro) &&
      cat.diaria_base >= precoMin &&
      cat.diaria_base <= precoMax
    );
  });

  // Função de exclusão das categorias selecionadas
  const handleApagarSelecionadas = async () => {
    if (selecionadas.length === 0) return;
    if (
      !window.confirm(
        `Deseja realmente apagar ${selecionadas.length} categoria(s)?`
      )
    )
      return;

    try {
      await Promise.all(selecionadas.map((id) => apagarCategoria(id)));
      await carregarCategorias(); // recarrega a lista
    } catch (error) {
      console.error("Erro ao apagar categorias:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 p-10">
      <h1 className="text-3xl font-extrabold text-blue-700 mb-6 text-center">
        Categorias de Veículos
      </h1>

      {/* Formulário */}
      <div className="mb-6">
        <button
          onClick={() => setMostrarForm(!mostrarForm)}
          className="bg-gradient-to-r from-blue-500 to-blue-600 text-white px-6 py-3 rounded-2xl font-semibold shadow-lg hover:from-blue-600 hover:to-blue-700 hover:shadow-xl transition-all duration-300 mb-4"
        >
          {mostrarForm ? "Fechar Formulário" : "Cadastrar Categoria"}
        </button>

        {mostrarForm && (
          <div className="mt-4">
            <CategoriaForm onCategoriaAdicionada={carregarCategorias} />
          </div>
        )}
      </div>

      {/* Filtro */}
      <FiltroGenerico
        campos={[
          { nome: "nome", label: "Nome da Categoria", placeholder: "Ex: SUV" },
          {
            nome: "precoMin",
            label: "Preço mínimo",
            tipo: "number",
            placeholder: "Ex: 100",
          },
          {
            nome: "precoMax",
            label: "Preço máximo",
            tipo: "number",
            placeholder: "Ex: 500",
          },
        ]}
        onFiltrar={handleFiltrar}
        onLimpar={() => setFiltros({})}
      />

      {/* Botão de apagar categorias */}
      <BulkDeleteButton
        selecionadas={selecionadas}
        onDelete={handleApagarSelecionadas}
      />

      {/* Lista de categorias */}
      <CategoriaList
        categorias={categoriasFiltradas}
        selecionadas={selecionadas}
        setSelecionadas={setSelecionadas}
      />
    </div>
  );
};

export default CategoriaPage;
