import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../services/authServices";

const LoginPage: React.FC = () => {
  const [form, setForm] = useState({ username: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      const data = await loginUser(form.username, form.password);
      localStorage.setItem("token", data.access);
      navigate("/dashboard");
    } catch {
      setError("Usuário ou senha incorretos.");
    }
  };

  return (
    <div style={styles.container}>
      <form onSubmit={handleLogin} style={styles.form}>
        <h2 style={styles.title}>KeroCarros - Login</h2>

        <input
          name="username"
          type="text"
          placeholder="Usuário"
          value={form.username}
          onChange={handleChange}
          style={styles.input}
        />

        <input
          name="password"
          type="password"
          placeholder="Senha"
          value={form.password}
          onChange={handleChange}
          style={styles.input}
        />

        {error && <p style={styles.error}>{error}</p>}

        <button type="submit" style={styles.button}>
          Entrar
        </button>
      </form>
    </div>
  );
};

const styles: Record<string, React.CSSProperties> = {
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    minHeight: "100vh",
    width: "100vw",
    backgroundColor: "#f4f4f4",
    padding: "20px",
    boxSizing: "border-box",
  },
  form: {
    width: "100%",
    maxWidth: "400px",
    padding: "30px",
    display: "flex",
    flexDirection: "column",
    border: "1px solid #ddd",
    borderRadius: "8px",
    backgroundColor: "#fff",
    boxSizing: "border-box",
    boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
  },
  title: {
    textAlign: "center",
    marginBottom: "20px",
    fontSize: "24px",
    color: "#1a73e8",
  },
  input: {
    padding: "10px",
    marginBottom: "15px",
    borderRadius: "5px",
    border: "1px solid #ccc",
    fontSize: "16px",
  },
  button: {
    padding: "10px",
    backgroundColor: "#1a73e8",
    color: "#fff",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    fontSize: "16px",
    transition: "background-color 0.3s ease",
  },
  error: {
    color: "red",
    marginBottom: "10px",
    fontSize: "14px",
    textAlign: "center",
  },
};

// Efeito hover bonito no botão
styles.button[":hover" as any] = {
  backgroundColor: "#155ab6",
};

export default LoginPage;
