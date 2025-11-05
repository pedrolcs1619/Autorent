import axios from "axios";

const API_URL = "http://localhost:8000/api/v1/categorias/";

// Lista todas as categorias
export const listarCategorias = async () => {
  const response = await axios.get(API_URL, { withCredentials: true });
  return response.data.results || response.data;
};


// Cria uma nova categoria
export const criarCategoria = async (categoria: any) => {
  const response = await axios.post(API_URL, categoria, {
    withCredentials: true,
  });
  return response.data;
};

// Atualiza uma categoria existente
export const atualizarCategoria = async (id: number, categoria: any) => {
  const response = await axios.put(`${API_URL}${id}/`, categoria, {
    withCredentials: true,
  });
  return response.data;
};

// Apaga uma categoria
export const apagarCategoria = async (id: number) => {
  await axios.delete(`${API_URL}${id}/`, { withCredentials: true });
};
