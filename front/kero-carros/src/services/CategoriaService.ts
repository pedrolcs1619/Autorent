import type { Categoria } from "../types/categoria";

const API_URL = "http://localhost:8000/api/v1/categorias"; // <-- sem a barra no final

// Listar todas as categorias
export const listarCategorias = async (): Promise<Categoria[]> => {
  const response = await fetch(`${API_URL}/`, { // adiciona barra aqui
    credentials: "include",
  });
  const data = await response.json();
  return data.results.map((cat: any) => ({
    ...cat,
    diaria_base: Number(cat.diaria_base),
  }));
};

// Criar uma nova categoria
export const criarCategoria = async (
  categoria: Omit<Categoria, "id">
): Promise<Categoria> => {
  const response = await fetch(`${API_URL}/`, { // adiciona barra aqui
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify(categoria),
  });

  if (!response.ok) throw new Error("Erro ao criar categoria");
  return response.json();
};

// Apagar uma categoria pelo ID
export const apagarCategoria = async (id: number): Promise<void> => {
  const response = await fetch(`${API_URL}/${id}/`, { // apenas 1 barra entre URL e id
    method: "DELETE",
    credentials: "include",
  });

  if (!response.ok) throw new Error("Erro ao apagar categoria");
};
