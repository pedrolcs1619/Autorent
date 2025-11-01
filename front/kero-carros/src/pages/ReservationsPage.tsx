import React from "react";

interface Reservation {
  id: number;
  cliente: string;
  carro: string;
  dataInicio: string;
  dataFim: string;
  precoTotal: number;
}

const ReservationsPage: React.FC = () => {
  const reservations: Reservation[] = [
    {
      id: 1,
      cliente: "João Silva",
      carro: "Honda Civic",
      dataInicio: "2025-11-01",
      dataFim: "2025-11-05",
      precoTotal: 600,
    },
    {
      id: 2,
      cliente: "Maria Souza",
      carro: "Toyota Corolla",
      dataInicio: "2025-11-03",
      dataFim: "2025-11-06",
      precoTotal: 510,
    },
    {
      id: 3,
      cliente: "Carlos Lima",
      carro: "Chevrolet Onix",
      dataInicio: "2025-11-02",
      dataFim: "2025-11-04",
      precoTotal: 240,
    },
  ];

  return (
    <div style={styles.container}>
      <h1>Reservas</h1>
      <div style={styles.cards}>
        {reservations.map((res) => (
          <div key={res.id} style={styles.card}>
            <h3>{res.cliente}</h3>
            <p>Carro: {res.carro}</p>
            <p>De: {res.dataInicio}</p>
            <p>Até: {res.dataFim}</p>
            <p>Total: R$ {res.precoTotal}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

const styles: { [key: string]: React.CSSProperties } = {
  container: {
    width: "100%",
    height: "100%",
    boxSizing: "border-box",
  },
  cards: {
    display: "flex",
    flexWrap: "wrap",
    gap: "20px",
    marginTop: "20px",
    justifyContent: "center",
  },
  card: {
    flex: "1 1 250px",
    maxWidth: "250px",
    padding: "20px",
    backgroundColor: "#fff",
    borderRadius: "10px",
    boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
    textAlign: "center",
  },
};

export default ReservationsPage;
