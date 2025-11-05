// AuthContext.ts
import { createContext } from "react";

export interface AuthContextType {
  user: string | null;
  login: (username: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  isAuthenticated: boolean;
  loading: boolean; // ✅ adicionado
}

export const AuthContext = createContext<AuthContextType>({
  user: null,
  login: async () => {},
  logout: async () => {},
  isAuthenticated: false,
  loading: true, // ✅ valor inicial
});
