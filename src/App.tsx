import { useEffect, useRef, useState } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import OthersRoutes from "@/routes/OthersRoutes";
import { autoLogin } from "@/services/auto-login";
import { getAccessToken } from "@/services/auth-token";
import { useUser } from "@/context/UserContext";

const publicPaths = new Set(["/", "/login", "/register", "/recuperarSenha"]);

export default function App() {
  const { pathname } = useLocation();
  const { setUsuario } = useUser();
  const [estaInicializando, setEstaInicializando] = useState(() =>
    !publicPaths.has(window.location.pathname) && !getAccessToken()
  );
  const inicializado = useRef(false);

  useEffect(() => {
    if (inicializado.current) return;
    inicializado.current = true;

    // Public pages must never attempt cookie-based authentication:
    // without a RefreshToken, auto-login correctly returns HTTP 401.
    if (publicPaths.has(pathname) || getAccessToken()) {
      setEstaInicializando(false);
      return;
    }

    let ativo = true;
    async function validarSessao() {
      try {
        const usuario = await autoLogin();
        if (ativo && usuario) setUsuario(usuario);
      } catch (error: unknown) {
        // A missing/expired session is expected for signed-out visitors.
        // ProtectedRoute redirects them to the login page.
        if (ativo) {
          console.info("Nenhuma sessão ativa disponível para restauração.");
        }
      } finally {
        if (ativo) setEstaInicializando(false);
      }
    }

    void validarSessao();
    return () => { ativo = false; };
  }, [pathname, setUsuario]);

  if (estaInicializando) {
    return (
      <div style={{
        display: "flex", justifyContent: "center", alignItems: "center",
        height: "100vh", backgroundColor: "#121212", color: "#fff"
      }}>
        <p>Carregando sua sessão...</p>
      </div>
    );
  }

  return (
    <Routes>
      <Route path="/*" element={<OthersRoutes />} />
    </Routes>
  );
}
