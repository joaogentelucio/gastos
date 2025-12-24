import { useState, useEffect, useRef } from 'react'; // Adicionado useRef
import { Navigate, Routes, Route } from "react-router-dom";
import OthersRoutes from "@/routes/OthersRoutes";
import { autoLogin } from "@/services/auto-login"; 
import { useUser } from "@/context/UserContext"; 

export default function App() {
  const [estaInicializando, setEstaInicializando] = useState(true);
  const { setUsuario } = useUser();
  const inicializado = useRef(false); // Ref para garantir execução única

  useEffect(() => {
    // Se já tentou inicializar, não faz nada (previne loops de renderização)
    if (inicializado.current) return;

    async function validarSessao() {
      try {
        const usuario = await autoLogin();
        if (usuario) {
          setUsuario(usuario);
        }
      } catch (error: any) {
        if (error.response?.status === 401) 
        {
          console.log("Nenhuma sessão anterior encontrada. Aguardando login manual.");
        } else {
          console.error("Erro inesperado no login automático:", error);
        }
      } finally {
        inicializado.current = true;
        setEstaInicializando(false);
      }
    }

    validarSessao();
  }, []); // Array vazio garante que rode apenas UMA VEZ ao montar o App

  if (estaInicializando) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <p>Carregando sua sessão...</p>
      </div>
    );
  }

  return (
    <Routes>
      <Route path="/" element={<Navigate to="/app" replace />} />
      <Route path="/app/*" element={<OthersRoutes/>} />
    </Routes>
  );
};