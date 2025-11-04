import React, { useState } from "react";
import { AuthContext } from "./AuthContext";
import { loginUser, logoutUser } from "../services/authServices";

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<string | null>(null);

  const login = async (username: string, password: string) => {
    await loginUser(username, password);
    setUser(username);
  };

  const logout = async () => {
    await logoutUser();
    setUser(null);
  };

  const isAuthenticated = !!user;

  return (
    <AuthContext.Provider value={{ user, login, logout, isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
};
