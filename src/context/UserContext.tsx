import React, { createContext, useContext, useState, useEffect } from "react";
import api from "@/services/api";
import { getAccessToken, setAccessToken } from "@/services/auth-token";
import { Logout as authLogout } from "@/services/logout-service";

type Plano = "FREE" | "PRO";

type Usuario = {
  Id: number;
  Nome: string;
  Email: string;
  FotoPerfil: string;
  PlanoAtual: Plano;
  RenovaAutomatico?: boolean; 
};

type UserContextType = {
  usuario: Usuario | null;
  setUsuario: (usuario: Usuario | null) => void;
  refreshUser: () => Promise<void>;
  logout: () => Promise<void>;
  loading: boolean;
};

const UserContext = createContext<UserContextType | undefined>(undefined);

const capitalizeName = (nome: string) =>
  nome
    .toLowerCase()
    .split(" ")
    .map(p => p.charAt(0).toUpperCase() + p.slice(1))
    .join(" ");

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const [usuario, setUsuarioState] = useState<Usuario | null>(null);
  const [loading, setLoading] = useState(true);

  const setUsuario = (novoUsuario: Usuario | null) => {
    if (novoUsuario) {
      setUsuarioState(novoUsuario);
      localStorage.setItem("usuario", JSON.stringify(novoUsuario));
    } else {
      setUsuarioState(null);
      localStorage.removeItem("usuario");
    }
  };

  const refreshUser = async () => {
    try {
      setLoading(true);

      const token = getAccessToken();
      if (!token) {
        setUsuario(null);
        return;
      }

      setAccessToken(token);

      const response = await api.get("/Usuario/me");

      const data = response.data;

      const usuarioFormatado: Usuario = {
        Id: data.Id,
        Nome: capitalizeName(data.Nome),
        Email: data.Email.toLowerCase(),
        FotoPerfil: data.FotoPerfil,
        PlanoAtual: data.PlanoAtual,
        RenovaAutomatico: data.RenovaAutomatico,
      };

      setUsuario(usuarioFormatado);
    } catch (error) {
      console.error("Erro ao carregar usuário:", error);
      setUsuario(null);
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    setUsuario(null);
    await authLogout();
  };

  useEffect(() => {
    refreshUser();
  }, []);

  return (
    <UserContext.Provider
      value={{ usuario, setUsuario, refreshUser, logout, loading }}
    >
      {children}
    </UserContext.Provider>
  );
};

export function useUser() {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser deve ser usado dentro de UserProvider");
  }
  return context;
}
