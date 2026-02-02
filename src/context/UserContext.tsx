import React, { createContext, useContext, useState, useEffect } from "react";
import { getAccessToken, setAccessToken } from "@/services/auth-token";
import { Logout as authLogout } from "@/services/logout-service";

type Plano = "FREE" | "PRO";

type Usuario = {
  Id: number;
  Nome: string;
  Email: string;
  FotoPerfil: string;
  PlanoAtual: Plano;
};

type UserContextType = {
  usuario: Usuario | null;
  setUsuario: (usuario: Usuario | null) => void;
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

  useEffect(() => {
    const token = getAccessToken();
    if (token) {
      setAccessToken(token);
    }

    const usuarioStr = localStorage.getItem("usuario");
    if (usuarioStr) {
      setUsuarioState(JSON.parse(usuarioStr));
    }

    setLoading(false);
  }, []);

  const setUsuario = (novoUsuario: any | null) => {
    if (novoUsuario) {
      const usuarioFormatado: Usuario = {
        Id: novoUsuario.IdUsuario ?? novoUsuario.Id,
        Nome: capitalizeName(novoUsuario.Nome),
        Email: novoUsuario.Email.toLowerCase(),
        FotoPerfil: novoUsuario.FotoPerfil,
        PlanoAtual: novoUsuario.PlanoAtual ?? "FREE",
      };

      setUsuarioState(usuarioFormatado);
      localStorage.setItem("usuario", JSON.stringify(usuarioFormatado));
    } else {
      localStorage.removeItem("usuario");
      setUsuarioState(null);
    }
  };

  const logout = async () => {
    setUsuarioState(null);
    localStorage.removeItem("usuario");
    await authLogout();
  };

  return (
    <UserContext.Provider value={{ usuario, setUsuario, logout, loading }}>
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
