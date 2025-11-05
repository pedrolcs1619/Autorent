import React, { useState, useEffect, useRef } from "react";
import type { Veiculo } from "../types/veiculo";
import type { Categoria } from "../types/categoria";
import { Car, Save, X } from "lucide-react";
import { criarVeiculo, atualizarVeiculo } from "../services/VeiculoService";
import { listarCategorias } from "../services/CategoriaService";

interface VeiculoFormProps {
  veiculoAtual?: Veiculo | null;
  onVeiculoSalvo: () => void;
  onFechar: () => void;
}

const VeiculoForm: React.FC<VeiculoFormProps> = ({
  veiculoAtual,
  onVeiculoSalvo,
  onFechar,
}) => {
  const [formData, setFormData] = useState<Veiculo>({
    categoria: 0,
    marca: "",
    modelo: "",
    placa: "",
    ano: new Date().getFullYear(),
    status: "disponivel",
  });

  const [categorias, setCategorias] = useState<Categoria[]>([]);

  const modalRef = useRef<HTMLDivElement>(null);

  // Carrega categorias
  useEffect(() => {
    const carregarCategorias = async () => {
      try {
        const data = await listarCategorias();
        setCategorias(data.results || data);
      } catch (err) {
        console.error("Erro ao carregar categorias:", err);
      }
    };
    carregarCategorias();
  }, []);

  useEffect(() => {
    if (veiculoAtual) setFormData(veiculoAtual);
  }, [veiculoAtual]);

  // Fecha ao clicar fora
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(e.target as Node))
        onFechar();
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [onFechar]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: name === "categoria" || name === "ano" ? parseInt(value) : value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (veiculoAtual) await atualizarVeiculo(veiculoAtual.id!, formData);
      else await criarVeiculo(formData);
      onVeiculoSalvo();
      onFechar();
    } catch (err) {
      console.error("Erro ao salvar veículo:", err);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm">
      <div
        ref={modalRef}
        className="relative w-full max-w-lg bg-white rounded-2xl shadow-2xl p-8 border border-gray-100"
      >
        <button
          onClick={onFechar}
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
        >
          <X size={22} />
        </button>

        <h2 className="text-2xl font-bold text-blue-700 mb-6 text-center flex items-center justify-center gap-2">
          <Car size={24} className="text-blue-600" />
          {veiculoAtual ? "Editar Veículo" : "Novo Veículo"}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Categoria */}
          <div>
            <label className="block text-gray-700 font-semibold mb-1">
              Categoria
            </label>
            <select
              name="categoria"
              value={formData.categoria}
              onChange={handleChange}
              className="w-full border rounded-xl px-3 py-2"
              required
            >
              <option value={0} disabled>
                Selecione uma categoria
              </option>
              {categorias.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.nome}
                </option>
              ))}
            </select>
          </div>

          {/* Marca */}
          <div>
            <label className="block text-gray-700 font-semibold mb-1">
              Marca
            </label>
            <input
              type="text"
              name="marca"
              value={formData.marca}
              onChange={handleChange}
              className="w-full border rounded-xl px-3 py-2"
              placeholder="Ex: Honda"
              required
            />
          </div>

          {/* Modelo */}
          <div>
            <label className="block text-gray-700 font-semibold mb-1">
              Modelo
            </label>
            <input
              type="text"
              name="modelo"
              value={formData.modelo}
              onChange={handleChange}
              className="w-full border rounded-xl px-3 py-2"
              placeholder="Ex: Civic"
              required
            />
          </div>

          {/* Placa */}
          <div>
            <label className="block text-gray-700 font-semibold mb-1">
              Placa
            </label>
            <input
              type="text"
              name="placa"
              value={formData.placa}
              onChange={handleChange}
              className="w-full border rounded-xl px-3 py-2"
              placeholder="Ex: ABC-1237"
              required
            />
          </div>

          {/* Ano */}
          <div>
            <label className="block text-gray-700 font-semibold mb-1">
              Ano
            </label>
            <input
              type="number"
              name="ano"
              value={formData.ano}
              onChange={handleChange}
              className="w-full border rounded-xl px-3 py-2"
              required
            />
          </div>

          {/* Status */}
          <div>
            <label className="block text-gray-700 font-semibold mb-1">
              Status
            </label>
            <select
              name="status"
              value={formData.status}
              onChange={handleChange}
              className="w-full border rounded-xl px-3 py-2"
            >
              <option value="disponivel">Disponível</option>
              <option value="manutencao">Manutenção</option>
              <option value="alugado">Alugado</option>
            </select>
          </div>

          <button
            type="submit"
            className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-blue-500 to-blue-600 text-white px-6 py-3 rounded-2xl font-semibold shadow-md hover:from-blue-600 hover:to-blue-700 transition-all"
          >
            <Save size={20} />
            {veiculoAtual ? "Atualizar" : "Cadastrar"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default VeiculoForm;
