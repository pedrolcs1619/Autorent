import React from "react";

const DashboardPage: React.FC = () => {
  return (
    <div style={styles.container}>
      <h1>Bem-vindo à KeroCarros 🚗</h1>
      <p>Escolha uma opção no menu ou veja os carros disponíveis.</p>

      {/* Exemplos de cards de funcionalidades */}
      <div style={styles.cards}>
        <div style={styles.card}>Carros disponíveis</div>
        <div style={styles.card}>Reservas</div>
        <div style={styles.card}>Clientes</div>
      </div>
    </div>
  );
};

const styles: { [key: string]: React.CSSProperties } = {
  container: {
    height: "100vh", // ocupa toda a altura da tela
    width: "100vw", // ocupa toda a largura da tela
    padding: "40px",
    backgroundColor: "#f4f4f4",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center", // centraliza verticalmente
    boxSizing: "border-box",
  },
  cards: {
    display: "flex",
    flexWrap: "wrap", // permite quebra de linha em telas menores
    justifyContent: "center", // centraliza horizontalmente
    gap: "20px",
    marginTop: "30px",
    width: "100%", // ocupa toda a largura disponível
  },
  card: {
    flex: "1 1 150px", // cresce proporcionalmente e mínima largura de 150px
    maxWidth: "200px", // limite máximo para não esticar demais
    padding: "20px",
    backgroundColor: "#fff",
    borderRadius: "10px",
    boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
    textAlign: "center",
    cursor: "pointer",
    boxSizing: "border-box",
  },
};

export default DashboardPage;
