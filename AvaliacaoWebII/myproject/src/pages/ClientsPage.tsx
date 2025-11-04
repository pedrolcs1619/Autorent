import React from "react";

interface Client {
  id: number;
  nome: string;
  email: string;
  telefone: string;
  cpf: string;
}

const ClientsPage: React.FC = () => {
  const clients: Client[] = [
    {
      id: 1,
      nome: "João Silva",
      email: "joao@gmail.com",
      telefone: "(83) 99999-1111",
      cpf: "123.456.789-00",
    },
    {
      id: 2,
      nome: "Maria Souza",
      email: "maria@gmail.com",
      telefone: "(83) 98888-2222",
      cpf: "987.654.321-00",
    },
    {
      id: 3,
      nome: "Carlos Lima",
      email: "carlos@gmail.com",
      telefone: "(83) 97777-3333",
      cpf: "111.222.333-44",
    },
  ];

  return (
    <div style={styles.container}>
      <h1>Clientes</h1>
      <div style={styles.cards}>
        {clients.map((client) => (
          <div key={client.id} style={styles.card}>
            <h3>{client.nome}</h3>
            <p>Email: {client.email}</p>
            <p>Telefone: {client.telefone}</p>
            <p>CPF: {client.cpf}</p>
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

export default ClientsPage;
