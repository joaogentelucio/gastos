import { useState, useEffect, useRef } from 'react'; 
import { Routes, Route } from "react-router-dom";
import OthersRoutes from "@/routes/OthersRoutes";
import { autoLogin } from "@/services/auto-login"; 
import { useUser } from "@/context/UserContext"; 

export default function App() {
  const [estaInicializando, setEstaInicializando] = useState(true);
  const { setUsuario } = useUser();
  const inicializado = useRef(false); 

  useEffect(() => {
    if (inicializado.current) return;
    inicializado.current = true;

    async function validarSessao() {
      try {
        const usuario = await autoLogin();
        if (usuario) {
          setUsuario(usuario);
        }
      } catch (error: any) {
        
        if (error.response?.status === 401) {
          console.log("Sessão inexistente ou expirada. Redirecionando para login.");
          setUsuario(null); 
        } else {
          console.error("Erro na comunicação com o servidor:", error);
        }
      } finally {
        setEstaInicializando(false);
      }
    }

    validarSessao();
  }, [setUsuario]); 

  if (estaInicializando) {
    return (
      <div style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        height: '100vh',
        backgroundColor: '#121212', 
        color: '#fff' 
      }}>
        <p>Carregando sua sessão...</p>
      </div>
    );
  }

  return (
    <Routes>
      <Route path="/" element={<OthersRoutes />} />
      <Route path="/*" element={<OthersRoutes/>} />
    </Routes>
  );
};