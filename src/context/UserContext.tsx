import React, { createContext, useContext, useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";
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
  const [usuario, setUsuarioState] = useState<Usuario | null>(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("usuario");
      return saved ? JSON.parse(saved) : null;
    }
    return null;
  });
  const [loading, setLoading] = useState(true);

  const setUsuario = (novoUsuario: any | null) => {
    if (novoUsuario) {
      const nomeLimpo = novoUsuario.Nome || novoUsuario.unique_name || "Usuário";
      const emailLimpo = novoUsuario.Email || novoUsuario.email || "";

      const usuarioFormatado: Usuario = {
        Id: novoUsuario.IdUsuario ?? novoUsuario.Id,
        Nome: capitalizeName(nomeLimpo),
        Email: emailLimpo.toLowerCase(),
        FotoPerfil: novoUsuario.FotoPerfil,
        PlanoAtual: novoUsuario.PlanoAtual ?? "FREE",
      };

      setUsuarioState(usuarioFormatado);
      localStorage.setItem("usuario", JSON.stringify(usuarioFormatado));
    } else {
      setUsuarioState(null);
      localStorage.removeItem("usuario");
    }
  };

  const refreshUser = async () => {
    try {
      const token = getAccessToken();
      if (token) {
        const decoded: any = jwtDecode(token);
        console.log("Dados do Token:", decoded);

        setUsuario({
          Id: decoded.Id || decoded.id,
          Nome: decoded.nome || decoded.Nome || "Usuário",
          Email: decoded.email || decoded.Email || "",
          FotoPerfil: decoded.foto || "SEM_FOTO",
          PlanoAtual: decoded.PlanoAtual || "FREE", 
        });
      } else {
        setUsuario(null);
      }
    } catch (err) {
      console.error("Erro ao decodificar token:", err);
      setUsuario(null);
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    setUsuarioState(null);
    localStorage.removeItem("usuario");
    await authLogout();
  };

  useEffect(() => {
    const token = getAccessToken();
    if (token) {
      setAccessToken(token);
    }

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
