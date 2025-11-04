import axios from "axios";

const API_LOGIN_URL = "http://localhost:8000/api/token/";
const API_LOGOUT_URL = "http://localhost:8000/api/logout/";

// Faz login do usuário
export const loginUser = async (username: string, password: string) => {
  const response = await axios.post(
    API_LOGIN_URL,
    { username, password },
    { withCredentials: true } // envia/recebe cookies (JWT em cookie)
  );
  return response.data; // { access, refresh }
};

// Faz logout do usuário
export const logoutUser = async () => {
  const response = await axios.post(
    API_LOGOUT_URL,
    {}, // envia um corpo vazio
    { withCredentials: true } // garante que o cookie de sessão seja enviado
  );

  if (response.status !== 200 && response.status !== 204) {
    throw new Error("Erro ao fazer logout");
  }

  return true; // logout bem-sucedido
};
