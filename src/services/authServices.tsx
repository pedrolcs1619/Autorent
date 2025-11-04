import axios from "axios";

const API_URL = "http://localhost:8000/api/token/";

export const loginUser = async (username: string, password: string) => {
  const response = await axios.post(
    API_URL,
    { username, password },
    { withCredentials: true } // envia/recebe cookies (para JWT com cookies)
  );
  return response.data;
};
