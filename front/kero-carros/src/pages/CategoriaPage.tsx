import React, { useState } from "react";
import { Car, Tag, DollarSign } from "lucide-react";

const CategoriaAdd: React.FC = () => {
  const [nome, setNome] = useState("");
  const [descricao, setDescricao] = useState("");
  const [diariaBase, setDiariaBase] = useState("");
  const [mensagem, setMensagem] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMensagem("");

    try {
      const response = await fetch("http://localhost:8000/api/v1/categorias/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ nome, descricao, diaria_base: diariaBase }),
      });

      if (!response.ok) throw new Error("Erro ao cadastrar categoria");

      setMensagem("✅ Categoria cadastrada com sucesso!");
      setNome("");
      setDescricao("");
      setDiariaBase("");
    } catch (error) {
      console.error("Erro ao cadastrar categoria:", error);
      setMensagem("❌ Erro ao cadastrar categoria. Tente novamente.");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-slate-100 to-blue-200 p-4">
      <div className="bg-white/90 backdrop-blur-lg shadow-2xl rounded-3xl p-10 w-full max-w-md border border-blue-200">
        <h1 className="text-3xl font-extrabold mb-10 text-center bg-gradient-to-r from-blue-700 to-blue-400 bg-clip-text text-transparent flex items-center justify-center gap-2">
          <Car size={28} /> Cadastrar Categoria
        </h1>

        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
          {/* Nome */}
          <div>
            <label className="block font-semibold mb-2 text-gray-700 flex items-center gap-2">
              <Tag className="text-blue-500" size={18} /> Nome
            </label>
            <input
              type="text"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              required
              placeholder="Ex: SUV"
              className="w-full border border-gray-300 rounded-2xl px-4 py-3 focus:ring-2 focus:ring-blue-400 focus:border-blue-400 shadow-sm hover:shadow-md transition"
            />
          </div>

          {/* Descrição */}
          <div>
            <label className="block font-semibold mb-2 text-gray-700 flex items-center gap-2">
              <Car className="text-blue-500" size={18} /> Descrição
            </label>
            <input
              type="text"
              value={descricao}
              onChange={(e) => setDescricao(e.target.value)}
              required
              placeholder="Ex: Veículo grande"
              className="w-full border border-gray-300 rounded-2xl px-4 py-3 focus:ring-2 focus:ring-blue-400 focus:border-blue-400 shadow-sm hover:shadow-md transition"
            />
          </div>

          {/* Diária */}
          <div>
            <label className="block font-semibold mb-2 text-gray-700 flex items-center gap-2">
              <DollarSign className="text-blue-500" size={18} /> Diária Base
              (R$)
            </label>
            <input
              type="number"
              value={diariaBase}
              onChange={(e) => setDiariaBase(e.target.value)}
              required
              step="0.01"
              placeholder="Ex: 250.00"
              className="w-full border border-gray-300 rounded-2xl px-4 py-3 focus:ring-2 focus:ring-blue-400 focus:border-blue-400 shadow-sm hover:shadow-md transition"
            />
          </div>

          {/* Botão */}
          <button
            type="submit"
            className="mt-4 bg-gradient-to-r from-blue-600 to-blue-500 text-white rounded-2xl py-3 font-semibold hover:from-blue-700 hover:to-blue-600 shadow-lg hover:shadow-xl transition-all"
          >
            Salvar Categoria
          </button>
        </form>

        {/* Mensagem */}
        {mensagem && (
          <p
            className={`text-center mt-6 font-medium text-lg ${
              mensagem.startsWith("✅") ? "text-green-600" : "text-red-600"
            }`}
          >
            {mensagem}
          </p>
        )}
      </div>
    </div>
  );
};

export default CategoriaAdd;
