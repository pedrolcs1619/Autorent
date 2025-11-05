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

// Importando os estilos
import * as S from "../styles/CategoriaPageStyles";

const CategoriaPage: React.FC = () => {
  const [categorias, setCategorias] = useState<Categoria[]>([]);
  const [selecionadas, setSelecionadas] = useState<number[]>([]);
  const [filtros, setFiltros] = useState<Record<string, string>>({});
  const [mostrarForm, setMostrarForm] = useState(false);
  const [categoriaEditando, setCategoriaEditando] = useState<Categoria | null>(
    null
  );

  const carregarCategorias = async () => {
    try {
      const data = await listarCategorias();
      setCategorias(data.results || data);
      setSelecionadas([]);
    } catch (error) {
      console.error("Erro ao carregar categorias:", error);
    }
  };

  useEffect(() => {
    carregarCategorias();
  }, []);

  const handleEditar = (categoria: Categoria) => {
    setCategoriaEditando(categoria);
    setMostrarForm(true);
  };

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
      await carregarCategorias();
    } catch (error) {
      console.error("Erro ao apagar categorias:", error);
    }
  };

  return (
    <div style={S.container}>
      <h1 style={S.titulo}>Categorias de Veículos</h1>

      <div>
        <button
          onClick={() => {
            setMostrarForm(!mostrarForm);
            setCategoriaEditando(null);
          }}
          style={S.botaoAdicionar}
          onMouseEnter={(e) =>
            Object.assign(
              (e.target as HTMLButtonElement).style,
              S.botaoAdicionarHover
            )
          }
          onMouseLeave={(e) =>
            Object.assign(
              (e.target as HTMLButtonElement).style,
              S.botaoAdicionar
            )
          }
        >
          {mostrarForm ? "Fechar Formulário" : "Cadastrar Categoria"}
        </button>

        {mostrarForm && (
          <CategoriaForm
            categoriaAtual={categoriaEditando}
            onCategoriaSalva={() => {
              carregarCategorias();
              setMostrarForm(false);
              setCategoriaEditando(null);
            }}
            onFechar={() => {
              setMostrarForm(false);
              setCategoriaEditando(null);
            }}
          />
        )}
      </div>

      <div style={S.filtroContainer}>
        <FiltroGenerico
          campos={[
            {
              nome: "nome",
              label: "Nome da Categoria",
              placeholder: "Ex: SUV",
            },
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
      </div>

      <div style={S.bulkDeleteContainer}>
        <BulkDeleteButton
          selecionadas={selecionadas}
          onDelete={handleApagarSelecionadas}
        />
      </div>

      <CategoriaList
        categorias={categoriasFiltradas}
        selecionadas={selecionadas}
        setSelecionadas={setSelecionadas}
        onEdit={handleEditar}
      />
    </div>
  );
};

export default CategoriaPage;
