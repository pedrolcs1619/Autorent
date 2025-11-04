import React, { useState } from "react";

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

  const handleFiltrar = () => {
    onFiltrar(valores);
  };

  const handleLimpar = () => {
    setValores({});
    onLimpar?.();
  };

  return (
    <div className="bg-white shadow-lg rounded-2xl p-6 mb-6 flex flex-wrap gap-4 items-end border border-gray-200">
      {campos.map((campo) => (
        <div key={campo.nome} className="flex flex-col w-full sm:w-auto">
          <label className="text-sm font-semibold text-gray-700 mb-1">
            {campo.label}
          </label>

          {campo.tipo === "select" ? (
            <select
              className="border border-gray-300 rounded-xl px-3 py-2 focus:ring-2 focus:ring-blue-400 focus:border-blue-400 shadow-sm"
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
              className="border border-gray-300 rounded-xl px-3 py-2 focus:ring-2 focus:ring-blue-400 focus:border-blue-400 shadow-sm"
              value={valores[campo.nome] || ""}
              onChange={(e) => handleChange(campo.nome, e.target.value)}
            />
          )}
        </div>
      ))}

      <div className="flex gap-3 mt-2 sm:mt-0">
        <button
          onClick={handleFiltrar}
          className="bg-gradient-to-r from-blue-500 to-blue-600 text-white px-5 py-2 rounded-2xl font-semibold shadow-md hover:from-blue-600 hover:to-blue-700 hover:shadow-lg transition-all duration-300"
        >
          Filtrar
        </button>
        <button
          onClick={handleLimpar}
          className="bg-gradient-to-r from-gray-400 to-gray-500 text-white px-5 py-2 rounded-2xl font-semibold shadow-md hover:from-gray-500 hover:to-gray-600 hover:shadow-lg transition-all duration-300"
        >
          Limpar
        </button>
      </div>
    </div>
  );
};

export default FiltroGenerico;
