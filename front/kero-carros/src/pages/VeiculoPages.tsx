import React, { useEffect, useState } from "react";
import { listarVeiculos, apagarVeiculo } from "../services/VeiculoService";
import type { Veiculo } from "../types/veiculo";
import VeiculoForm from "../components/VeiculoForms";
import FiltroGenerico from "../components/FiltroComponent";
import BulkDeleteButton from "../components/BulkDeleteButton";
import VeiculoList from "../components/VeiculoList";
import CategoriaList from "../components/CategoriaList";

// Importando os estilos
import * as S from "../styles/VeiculoPageStyles";

const VeiculoPage: React.FC = () => {
  const [veiculos, setVeiculos] = useState<Veiculo[]>([]);
  const [selecionados, setSelecionados] = useState<number[]>([]);
  const [filtros, setFiltros] = useState<Record<string, string>>({});
  const [mostrarForm, setMostrarForm] = useState(false);
  const [veiculoEditando, setVeiculoEditando] = useState<Veiculo | null>(null);

  const carregarVeiculos = async () => {
    try {
      const data = await listarVeiculos();
      setVeiculos(data);
      setSelecionados([]);
    } catch (err) {
      console.error("Erro ao carregar veículos:", err);
    }
  };

  useEffect(() => {
    carregarVeiculos();
  }, []);

  const handleEditar = (veiculo: Veiculo) => {
    setVeiculoEditando(veiculo);
    setMostrarForm(true);
  };

  const handleFiltrar = (valores: Record<string, string>) => {
    setFiltros(valores);
  };

  const veiculosFiltrados = veiculos.filter((v) => {
    const marcaFiltro = filtros.marca?.toLowerCase() || "";
    const modeloFiltro = filtros.modelo?.toLowerCase() || "";
    const statusFiltro = filtros.status?.toLowerCase() || "";

    return (
      v.marca.toLowerCase().includes(marcaFiltro) &&
      v.modelo.toLowerCase().includes(modeloFiltro) &&
      v.status.toLowerCase().includes(statusFiltro)
    );
  });

  const handleApagarSelecionados = async () => {
    if (selecionados.length === 0) return;
    if (
      !window.confirm(
        `Deseja realmente apagar ${selecionados.length} veículo(s)?`
      )
    )
      return;

    try {
      await Promise.all(selecionados.map((id) => apagarVeiculo(id)));
      await carregarVeiculos();
    } catch (err) {
      console.error("Erro ao apagar veículos:", err);
    }
  };

  return (
    <div style={S.container}>
      <h1 style={S.titulo}>Veículos</h1>

      {/* Botão abrir/fechar formulário */}
      <div>
        <button
          onClick={() => {
            setMostrarForm(!mostrarForm);
            setVeiculoEditando(null);
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
          {mostrarForm ? "Fechar Formulário" : "Cadastrar Veículo"}
        </button>

        {mostrarForm && (
          <VeiculoForm
            veiculoAtual={veiculoEditando}
            onVeiculoSalvo={() => {
              carregarVeiculos();
              setMostrarForm(false);
              setVeiculoEditando(null);
            }}
            onFechar={() => {
              setMostrarForm(false);
              setVeiculoEditando(null);
            }}
          />
        )}
      </div>

      {/* Filtros */}
      <div style={S.filtroContainer}>
        <FiltroGenerico
          campos={[
            { nome: "marca", label: "Marca", placeholder: "Ex: Honda" },
            { nome: "modelo", label: "Modelo", placeholder: "Ex: Civic" },
            { nome: "status", label: "Status", placeholder: "disponivel" },
          ]}
          onFiltrar={handleFiltrar}
          onLimpar={() => setFiltros({})}
        />
      </div>

      {/* Bulk Delete */}
      <div style={S.bulkDeleteContainer}>
        <BulkDeleteButton
          selecionadas={selecionados}
          onDelete={handleApagarSelecionados}
        />
      </div>

      {/* Lista de veículos */}
      <VeiculoList
        veiculos={veiculosFiltrados}
        categorias={CategoriaList}
        selecionados={selecionados}
        setSelecionados={setSelecionados}
        onEdit={handleEditar}
      />
    </div>
  );
};

export default VeiculoPage;
