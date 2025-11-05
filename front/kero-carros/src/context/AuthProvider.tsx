import React, { useState, useEffect } from "react";
import { AuthContext } from "./AuthContext";
import {
  loginUser,
  logoutUser,
  getCurrentUser,
} from "../services/authServices";

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<string | null>(null);
  const [loading, setLoading] = useState(true); // controla enquanto checa login

  // Verifica se já existe um usuário logado
  useEffect(() => {
    const fetchUser = async () => {
      const currentUser = await getCurrentUser();
      if (currentUser) setUser(currentUser.username);
      setLoading(false);
    };
    fetchUser();
  }, []);

  const login = async (username: string, password: string) => {
    await loginUser(username, password);
    const currentUser = await getCurrentUser();
    if (currentUser) setUser(currentUser.username);
  };

  const logout = async () => {
    await logoutUser();
    setUser(null);
  };

  const isAuthenticated = !!user;

  // Enquanto checa login, mostra carregando
  if (loading) return <div>Carregando...</div>;

  return (
    <AuthContext.Provider
      value={{ user, login, logout, isAuthenticated, loading }}
    >
      {children}
    </AuthContext.Provider>
  );
};
