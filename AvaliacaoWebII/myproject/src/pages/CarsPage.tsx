import React from "react";

interface Car {
  id: number;
  modelo: string;
  marca: string;
  ano: number;
  precoDiaria: number;
}

const CarsPage: React.FC = () => {
  // Exemplo de dados, depois você pode integrar com API
  const cars: Car[] = [
    { id: 1, modelo: "Civic", marca: "Honda", ano: 2021, precoDiaria: 150 },
    { id: 2, modelo: "Corolla", marca: "Toyota", ano: 2022, precoDiaria: 170 },
    { id: 3, modelo: "Onix", marca: "Chevrolet", ano: 2020, precoDiaria: 120 },
  ];

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Carros Disponíveis</h1>
      <div style={styles.cards}>
        {cars.map((car) => (
          <div key={car.id} style={styles.card}>
            <h3>
              {car.marca} {car.modelo}
            </h3>
            <p>Ano: {car.ano}</p>
            <p>Preço diária: R$ {car.precoDiaria}</p>
            <button style={styles.button}>Reservar</button>
          </div>
        ))}
      </div>
    </div>
  );
};

const styles: { [key: string]: React.CSSProperties } = {
  container: {
    padding: "20px",
    width: "100%",
    height: "100%",
    boxSizing: "border-box",
  },
  title: {
    marginBottom: "20px",
    fontSize: "24px",
  },
  cards: {
    display: "flex",
    flexWrap: "wrap",
    gap: "20px",
  },
  card: {
    backgroundColor: "#fff",
    padding: "15px",
    borderRadius: "8px",
    boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
    minWidth: "200px",
    flex: "1 1 200px",
    textAlign: "center",
  },
  button: {
    marginTop: "10px",
    padding: "8px 12px",
    backgroundColor: "#1a73e8",
    color: "#fff",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
  },
};

export default CarsPage;
