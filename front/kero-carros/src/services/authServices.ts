import axios from "axios";

const API_LOGIN_URL = "http://localhost:8000/api/token/";
const API_LOGOUT_URL = "http://localhost:8000/api/logout/";
const API_ME_URL = "http://localhost:8000/api/me/";

// Faz login do usuário
export const loginUser = async (username: string, password: string) => {
  const response = await axios.post(
    API_LOGIN_URL,
    { username, password },
    { withCredentials: true }
  );
  return response.data;
};

// Faz logout do usuário
export const logoutUser = async () => {
  const response = await axios.post(
    API_LOGOUT_URL,
    {},
    { withCredentials: true }
  );

  if (response.status !== 200 && response.status !== 204) {
    throw new Error("Erro ao fazer logout");
  }

  return true;
};

// Retorna info do usuário logado (verifica cookie)
export const getCurrentUser = async () => {
  try {
    const response = await axios.get(API_ME_URL, { withCredentials: true });
    return response.data; // { username, email, ... }
  } catch (err) {
    return null;
  }
};
