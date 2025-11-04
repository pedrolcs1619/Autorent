import type{Categoria} from "../types/categoria";

const API_URL = "http://localhost:8000/api/v1/categorias/";

export async function listarCategorias() {
  const response = await fetch("http://localhost:8000/api/v1/categorias/", {
    method: "GET",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
  });

  if (!response.ok) throw new Error("Erro ao listar categorias");

  const data = await response.json();

  // 👇 Aqui está a correção: pega o array dentro de "results"
  const categorias = data.results || [];

  return categorias.map((cat: any) => ({
    id: cat.id,
    nome: cat.nome,
    descricao: cat.descricao,
    diaria_base: parseFloat(cat.diaria_base) || 0,
  }));
}


export async function criarCategoria(categoria: Omit<Categoria, "id">) {
  const response = await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify(categoria),
  });
  
  if (!response.ok) throw new Error("Erro ao criar categoria");
  return response.json();
}
