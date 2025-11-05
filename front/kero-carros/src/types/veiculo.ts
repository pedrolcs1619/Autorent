export interface Veiculo {
  id?: number;
  categoria: number;
  marca: string;
  modelo: string;
  placa: string;
  ano: number;
  status: "disponivel" | "manutencao" | "alugado";
}
