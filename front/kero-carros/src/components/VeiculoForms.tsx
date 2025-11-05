import React, { useState, useEffect, useRef } from "react";
import type { Veiculo } from "../types/veiculo";
import type { Categoria } from "../types/categoria";
import { Car, Save, X } from "lucide-react";
import { criarVeiculo, atualizarVeiculo } from "../services/VeiculoService";
import { listarCategorias } from "../services/CategoriaService";
import * as S from "../styles/components/VeiculoFormStyles";

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
    <div style={S.overlay}>
      <div ref={modalRef} style={S.modalContainer}>
        <button onClick={onFechar} style={S.closeButton}>
          <X size={22} />
        </button>

        <h2 style={S.tituloModal}>
          <Car size={24} />
          {veiculoAtual ? "Editar Veículo" : "Novo Veículo"}
        </h2>

        <form onSubmit={handleSubmit}>
          <div>
            <label style={S.label}>Categoria</label>
            <select
              name="categoria"
              value={formData.categoria}
              onChange={handleChange}
              style={S.input}
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

          <div>
            <label style={S.label}>Marca</label>
            <input
              type="text"
              name="marca"
              value={formData.marca}
              onChange={handleChange}
              style={S.input}
              placeholder="Ex: Honda"
              required
            />
          </div>

          <div>
            <label style={S.label}>Modelo</label>
            <input
              type="text"
              name="modelo"
              value={formData.modelo}
              onChange={handleChange}
              style={S.input}
              placeholder="Ex: Civic"
              required
            />
          </div>

          <div>
            <label style={S.label}>Placa</label>
            <input
              type="text"
              name="placa"
              value={formData.placa}
              onChange={handleChange}
              style={S.input}
              placeholder="Ex: ABC-1237"
              required
            />
          </div>

          <div>
            <label style={S.label}>Ano</label>
            <input
              type="number"
              name="ano"
              value={formData.ano}
              onChange={handleChange}
              style={S.input}
              required
            />
          </div>

          <div>
            <label style={S.label}>Status</label>
            <select
              name="status"
              value={formData.status}
              onChange={handleChange}
              style={S.input}
            >
              <option value="disponivel">Disponível</option>
              <option value="manutencao">Manutenção</option>
              <option value="alugado">Alugado</option>
            </select>
          </div>

          <button type="submit" style={S.submitButton}>
            <Save size={20} />
            {veiculoAtual ? "Atualizar" : "Cadastrar"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default VeiculoForm;
