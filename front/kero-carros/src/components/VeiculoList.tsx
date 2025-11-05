import React from "react";
import type { Veiculo } from "../types/veiculo";
import { Car, Edit3 } from "lucide-react";

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
      <p className="text-center text-gray-500 italic mt-10">
        Nenhum veículo cadastrado ainda.
      </p>
    );
  }

  return (
    <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 mb-10">
      {veiculos.map((v) => (
        <div
          key={v.id}
          className={`relative bg-white rounded-2xl p-6 shadow-md hover:shadow-xl transform transition-all border border-gray-100 ${
            selecionados.includes(v.id!) ? "ring-2 ring-blue-400" : ""
          }`}
        >
          {/* Checkbox de seleção */}
          <label className="absolute top-3 right-3 flex items-center">
            <input
              type="checkbox"
              checked={selecionados.includes(v.id!)}
              onChange={() => toggleSelecionar(v.id!)}
              className="w-5 h-5 accent-blue-600"
            />
            <span className="sr-only">Selecionar {v.modelo}</span>
          </label>

          {/* Cabeçalho com ícone */}
          <div className="flex items-center gap-3 mb-4">
            <div className="bg-blue-100 p-3 rounded-xl">
              <Car className="text-blue-600" size={24} />
            </div>
            <h2 className="text-lg font-semibold">
              <span className="text-blue-600" title="Marca do veículo">
                {v.marca}
              </span>{" "}
              <span className="text-gray-800" title="Modelo do veículo">
                {v.modelo}
              </span>
            </h2>
          </div>

          {/* Detalhes do veículo */}
          <p className="text-gray-600 text-sm leading-relaxed mb-1">
            <span className="font-semibold">Categoria:</span> {v.categoria}
          </p>
          <p className="text-gray-600 text-sm leading-relaxed mb-1">
            <span className="font-semibold">Placa:</span> {v.placa}
          </p>
          <p className="text-gray-600 text-sm leading-relaxed mb-1">
            <span className="font-semibold">Ano:</span> {v.ano}
          </p>
          <p className="text-gray-600 text-sm leading-relaxed">
            <span className="font-semibold">Status:</span>{" "}
            {v.status.charAt(0).toUpperCase() + v.status.slice(1)}
          </p>

          {/* Botão Editar */}
          {onEdit && (
            <button
              onClick={() => onEdit(v)}
              className="absolute bottom-3 right-3 bg-yellow-400 hover:bg-yellow-500 text-white px-3 py-1.5 rounded-lg text-sm flex items-center gap-1 shadow-md transition"
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
