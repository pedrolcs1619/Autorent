// src/services/VeiculoService.ts
import axios from "axios";
import type { Veiculo } from "../types/veiculo";

const API_URL = "http://localhost:8000/api/v1/veiculos/";

// Lista todos os veículos
export const listarVeiculos = async () => {
  const response = await axios.get(API_URL, { withCredentials: true });
  return response.data.results || response.data;
};

// Cria um novo veículo
export const criarVeiculo = async (veiculo: Omit<Veiculo, "id">) => {
  const response = await axios.post(API_URL, veiculo, { withCredentials: true });
  return response.data;
};

// Atualiza um veículo existente
export const atualizarVeiculo = async (id: number, veiculo: Veiculo) => {
  const response = await axios.put(`${API_URL}${id}/`, veiculo, { withCredentials: true });
  return response.data;
};

// Apaga um veículo
export const apagarVeiculo = async (id: number) => {
  await axios.delete(`${API_URL}${id}/`, { withCredentials: true });
};
