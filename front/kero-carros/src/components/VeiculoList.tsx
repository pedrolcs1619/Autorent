import React from "react";
import type { Veiculo } from "../types/veiculo";
import { Car, Edit3 } from "lucide-react";
import * as S from "../styles/components/VeiculoListStyles";

interface VeiculoListProps {
  veiculos: Veiculo[];
  selecionados: number[];
  setSelecionados: React.Dispatch<React.SetStateAction<number[]>>;
  onEdit?: (veiculo: Veiculo) => void;
}

const VeiculoList: React.FC<VeiculoListProps> = ({
  veiculos,
  selecionados,
  setSelecionados,
  onEdit,
}) => {
  const toggleSelecionar = (id: number) => {
    setSelecionados((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  if (!veiculos.length) {
    return (
      <p
        style={{
          textAlign: "center",
          color: "#6b7280",
          fontStyle: "italic",
          marginTop: "2.5rem",
        }}
      >
        Nenhum veículo cadastrado ainda.
      </p>
    );
  }

  return (
    <div
      style={{
        display: "grid",
        gap: "2rem",
        gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
        marginBottom: "2.5rem",
      }}
    >
      {veiculos.map((v) => (
        <div
          key={v.id}
          style={{
            ...S.card,
            ...(selecionados.includes(v.id!) ? S.cardSelected : {}),
          }}
        >
          {/* Checkbox */}
          <label
            style={{
              position: "absolute",
              top: "0.75rem",
              right: "0.75rem",
              display: "flex",
              alignItems: "center",
            }}
          >
            <input
              type="checkbox"
              checked={selecionados.includes(v.id!)}
              onChange={() => toggleSelecionar(v.id!)}
              style={S.checkbox}
            />
          </label>

          {/* Cabeçalho */}
          <div style={S.cardHeader}>
            <div style={S.iconWrapper}>
              <Car size={24} color="#2563eb" />
            </div>
            <h2 style={{ fontSize: "1.125rem", fontWeight: 600 }}>
              <span style={{ color: "#2563eb" }}>{v.marca}</span>{" "}
              <span style={{ color: "#1f2937" }}>{v.modelo}</span>
            </h2>
          </div>

          {/* Detalhes */}
          <div style={S.details}>
            <p>
              <strong>Categoria:</strong> {v.categoria}
            </p>
            <p>
              <strong>Placa:</strong> {v.placa}
            </p>
            <p>
              <strong>Ano:</strong> {v.ano}
            </p>
            <p>
              <strong>Status:</strong>{" "}
              {v.status.charAt(0).toUpperCase() + v.status.slice(1)}
            </p>
          </div>

          {/* Botão editar */}
          {onEdit && (
            <button
              onClick={() => onEdit(v)}
              style={S.editButton}
              onMouseEnter={(e) =>
                Object.assign(e.currentTarget.style, S.editButtonHover)
              }
              onMouseLeave={(e) =>
                Object.assign(e.currentTarget.style, S.editButton)
              }
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

export default VeiculoList;
