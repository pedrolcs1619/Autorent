import React, { useState } from "react";
import { Car, Tag, DollarSign, CheckCircle2, AlertCircle } from "lucide-react";
import { criarCategoria } from "../services/CategoriaService";

interface CategoriaFormProps {
  onCategoriaAdicionada: () => void; // ← prop que será passada pela CategoriaPage
}

const CategoriaForm: React.FC<CategoriaFormProps> = ({
  onCategoriaAdicionada,
}) => {
  const [nome, setNome] = useState("");
  const [descricao, setDescricao] = useState("");
  const [diariaBase, setDiariaBase] = useState("");
  const [mensagem, setMensagem] = useState("");
  const [sucesso, setSucesso] = useState<boolean | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMensagem("");
    setSucesso(null);

    try {
      await criarCategoria({
        nome,
        descricao,
        diaria_base: parseFloat(diariaBase),
      });

      setMensagem("Categoria cadastrada com sucesso!");
      setSucesso(true);
      setNome("");
      setDescricao("");
      setDiariaBase("");

      // Atualiza a lista de categorias na página principal
      onCategoriaAdicionada();
    } catch {
      setMensagem("Erro ao cadastrar categoria. Tente novamente.");
      setSucesso(false);
    }
  };

  return (
    <div className="bg-white/95 backdrop-blur-xl shadow-2xl rounded-3xl p-10 w-full max-w-lg border border-blue-100 transition-all duration-500 mx-auto">
      <div className="text-center mb-10">
        <h1 className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-700 to-blue-500 flex justify-center items-center gap-2">
          <Car size={28} /> Nova Categoria
        </h1>
        <p className="text-gray-500 mt-2 text-sm">
          Adicione uma nova categoria de veículo
        </p>
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col gap-6">
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
            className="w-full border rounded-2xl px-4 py-3 focus:ring-2 focus:ring-blue-400"
          />
        </div>

        <div>
          <label className="block font-semibold mb-2 text-gray-700 flex items-center gap-2">
            <Car className="text-blue-500" size={18} /> Descrição
          </label>
          <input
            type="text"
            value={descricao}
            onChange={(e) => setDescricao(e.target.value)}
            required
            placeholder="Ex: Veículo grande, ideal para famílias"
            className="w-full border rounded-2xl px-4 py-3 focus:ring-2 focus:ring-blue-400"
          />
        </div>

        <div>
          <label className="block font-semibold mb-2 text-gray-700 flex items-center gap-2">
            <DollarSign className="text-blue-500" size={18} /> Diária Base (R$)
          </label>
          <input
            type="number"
            value={diariaBase}
            onChange={(e) => setDiariaBase(e.target.value)}
            required
            step="0.01"
            placeholder="Ex: 250.00"
            className="w-full border rounded-2xl px-4 py-3 focus:ring-2 focus:ring-blue-400"
          />
        </div>

        <button
          type="submit"
          className="mt-4 bg-blue-600 text-white rounded-2xl py-3 font-semibold hover:bg-blue-700 transition"
        >
          Salvar Categoria
        </button>
      </form>

      {mensagem && (
        <div
          className={`mt-8 flex items-center gap-3 justify-center p-3 rounded-2xl font-semibold text-center ${
            sucesso
              ? "bg-green-100 text-green-700 border border-green-300"
              : "bg-red-100 text-red-700 border border-red-300"
          }`}
        >
          {sucesso ? <CheckCircle2 size={22} /> : <AlertCircle size={22} />}
          {mensagem}
        </div>
      )}
    </div>
  );
};

export default CategoriaForm;
