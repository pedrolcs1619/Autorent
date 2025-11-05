import React, { useState, useEffect, useRef } from "react";
import {
  criarCategoria,
  atualizarCategoria,
} from "../services/CategoriaService";
import type { Categoria } from "../types/categoria";
import { Car, FileText, DollarSign, Save, X } from "lucide-react";
import * as S from "../styles/components/CategoriaFormStyles";

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

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(e.target as Node))
        onFechar();
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [onFechar]);

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
      if (categoriaAtual)
        await atualizarCategoria(categoriaAtual.id, formData as Categoria);
      else await criarCategoria(formData);
      onCategoriaSalva();
      onFechar();
    } catch (error) {
      console.error("Erro ao salvar categoria:", error);
    }
  };

  return (
    <div style={S.overlayStyle}>
      <div
        ref={modalRef}
        role="dialog"
        aria-modal="true"
        style={S.modalContainerStyle}
      >
        <button
          onClick={onFechar}
          aria-label="Fechar"
          style={S.closeButtonStyle}
        >
          <X size={22} />
        </button>

        <h2 style={S.titleStyle}>
          <Car size={24} className="text-blue-600" />
          {categoriaAtual ? "Editar Categoria" : "Nova Categoria"}
        </h2>

        <form onSubmit={handleSubmit}>
          <div style={S.formGroupStyle}>
            <label>Nome</label>
            <div style={S.inputWrapperStyle}>
              <Car size={18} className="text-blue-500" />
              <input
                type="text"
                name="nome"
                placeholder="Ex: SUV"
                value={formData.nome}
                onChange={handleChange}
                style={S.inputStyle}
                required
                autoFocus
              />
            </div>
          </div>

          <div style={S.formGroupStyle}>
            <label>Descrição</label>
            <div style={S.inputWrapperStyle}>
              <FileText size={18} className="text-blue-500" />
              <input
                type="text"
                name="descricao"
                placeholder="Ex: Veículo espaçoso"
                value={formData.descricao}
                onChange={handleChange}
                style={S.inputStyle}
                required
              />
            </div>
          </div>

          <div style={S.formGroupStyle}>
            <label>Diária Base (R$)</label>
            <div style={S.inputWrapperStyle}>
              <DollarSign size={18} className="text-green-500" />
              <input
                type="number"
                name="diaria_base"
                placeholder="Ex: 250"
                value={formData.diaria_base}
                onChange={handleChange}
                style={S.inputStyle}
                required
              />
            </div>
          </div>

          <button type="submit" style={S.submitButtonStyle}>
            <Save size={20} />
            {categoriaAtual ? "Atualizar" : "Cadastrar"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default CategoriaForm;
