import React, { useState, useEffect, useRef } from "react";
import {
  criarCategoria,
  atualizarCategoria,
} from "../services/CategoriaService";
import type { Categoria } from "../types/categoria";
import { Car, FileText, DollarSign, Save, X } from "lucide-react";

interface Props {
  categoriaAtual?: Categoria | null;
  onCategoriaSalva: () => void;
  onFechar: () => void;
}

const CategoriaForm: React.FC<Props> = ({
  categoriaAtual,
  onCategoriaSalva,
  onFechar,
}) => {
  const [formData, setFormData] = useState<Omit<Categoria, "id">>({
    nome: "",
    descricao: "",
    diaria_base: 0,
  });

  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (categoriaAtual) {
      setFormData({
        nome: categoriaAtual.nome,
        descricao: categoriaAtual.descricao,
        diaria_base: categoriaAtual.diaria_base,
      });
    } else {
      setFormData({ nome: "", descricao: "", diaria_base: 0 });
    }
  }, [categoriaAtual]);

  // Fecha ao clicar fora do modal
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
        onFechar();
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [onFechar]);

  // Fecha ao pressionar ESC
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onFechar();
    };
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [onFechar]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: name === "diaria_base" ? parseFloat(value) : value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (categoriaAtual) {
        await atualizarCategoria(categoriaAtual.id, formData as Categoria);
      } else {
        await criarCategoria(formData);
      }
      onCategoriaSalva();
      onFechar();
    } catch (error) {
      console.error("Erro ao salvar categoria:", error);
    }
  };

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        backgroundColor: "rgba(0, 0, 0, 0.5)", // fundo preto translúcido
        backdropFilter: "blur(4px)", // efeito blur
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 50,
      }}
    >
      <div
        ref={modalRef}
        role="dialog"
        aria-modal="true"
        className="relative w-full max-w-lg bg-white rounded-2xl shadow-2xl p-8 border border-gray-100 animate-scaleIn"
      >
        {/* Botão de fechar */}
        <button
          onClick={onFechar}
          aria-label="Fechar"
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-700 transition"
        >
          <X size={22} />
        </button>

        {/* Título */}
        <h2 className="text-2xl font-bold text-blue-700 mb-6 text-center flex items-center justify-center gap-2">
          <Car size={24} className="text-blue-600" />
          {categoriaAtual ? "Editar Categoria" : "Nova Categoria"}
        </h2>

        {/* Formulário */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Nome */}
          <div>
            <label className="block text-gray-700 font-semibold mb-1">
              Nome
            </label>
            <div className="flex items-center border rounded-xl px-3 py-2 shadow-sm focus-within:ring-2 focus-within:ring-blue-400 transition">
              <Car size={18} className="text-blue-500 mr-2" />
              <input
                type="text"
                name="nome"
                placeholder="Ex: SUV"
                value={formData.nome}
                onChange={handleChange}
                className="flex-1 outline-none text-gray-800"
                required
                autoFocus
              />
            </div>
          </div>

          {/* Descrição */}
          <div>
            <label className="block text-gray-700 font-semibold mb-1">
              Descrição
            </label>
            <div className="flex items-center border rounded-xl px-3 py-2 shadow-sm focus-within:ring-2 focus-within:ring-blue-400 transition">
              <FileText size={18} className="text-blue-500 mr-2" />
              <input
                type="text"
                name="descricao"
                placeholder="Ex: Veículo espaçoso e confortável"
                value={formData.descricao}
                onChange={handleChange}
                className="flex-1 outline-none text-gray-800"
                required
              />
            </div>
          </div>

          {/* Diária Base */}
          <div>
            <label className="block text-gray-700 font-semibold mb-1">
              Diária Base (R$)
            </label>
            <div className="flex items-center border rounded-xl px-3 py-2 shadow-sm focus-within:ring-2 focus-within:ring-blue-400 transition">
              <DollarSign size={18} className="text-green-500 mr-2" />
              <input
                type="number"
                name="diaria_base"
                placeholder="Ex: 250"
                value={formData.diaria_base}
                onChange={handleChange}
                className="flex-1 outline-none text-gray-800"
                required
              />
            </div>
          </div>

          {/* Botão Salvar */}
          <div className="mt-6">
            <button
              type="submit"
              className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-blue-500 to-blue-600 text-white px-6 py-3 rounded-2xl font-semibold shadow-md hover:from-blue-600 hover:to-blue-700 transition-all duration-300"
            >
              <Save size={20} />
              {categoriaAtual ? "Atualizar" : "Cadastrar"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CategoriaForm;
