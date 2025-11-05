import React, { useState } from "react";
import * as S from "../styles/components/FiltroGenericoStyles";

interface CampoFiltro {
  nome: string;
  label: string;
  tipo?: "text" | "number" | "select";
  placeholder?: string;
  opcoes?: { label: string; valor: string }[]; // usado para select
}

interface FiltroGenericoProps {
  campos: CampoFiltro[];
  onFiltrar: (valores: Record<string, string>) => void;
  onLimpar?: () => void;
}

const FiltroGenerico: React.FC<FiltroGenericoProps> = ({
  campos,
  onFiltrar,
  onLimpar,
}) => {
  const [valores, setValores] = useState<Record<string, string>>({});

  const handleChange = (nome: string, valor: string) => {
    setValores((prev) => ({ ...prev, [nome]: valor }));
  };

  const handleFiltrar = () => onFiltrar(valores);
  const handleLimpar = () => {
    setValores({});
    onLimpar?.();
  };

  return (
    <div style={S.containerStyle}>
      {campos.map((campo) => (
        <div key={campo.nome} style={S.fieldWrapperStyle}>
          <label style={S.labelStyle}>{campo.label}</label>

          {campo.tipo === "select" ? (
            <select
              style={S.selectStyle}
              value={valores[campo.nome] || ""}
              onChange={(e) => handleChange(campo.nome, e.target.value)}
            >
              <option value="">Selecione...</option>
              {campo.opcoes?.map((op) => (
                <option key={op.valor} value={op.valor}>
                  {op.label}
                </option>
              ))}
            </select>
          ) : (
            <input
              type={campo.tipo || "text"}
              placeholder={campo.placeholder || ""}
              style={S.inputStyle}
              value={valores[campo.nome] || ""}
              onChange={(e) => handleChange(campo.nome, e.target.value)}
            />
          )}
        </div>
      ))}

      <div style={S.buttonGroupStyle}>
        <button onClick={handleFiltrar} style={S.filterButtonStyle}>
          Filtrar
        </button>
        <button onClick={handleLimpar} style={S.clearButtonStyle}>
          Limpar
        </button>
      </div>
    </div>
  );
};

export default FiltroGenerico;
