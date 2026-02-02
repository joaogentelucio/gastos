import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useUser } from "@/context/UserContext";

export default function Success() {
  const navigate = useNavigate();
  const { refreshUser } = useUser();
  const [searchParams] = useSearchParams();

 useEffect(() => {
    const sessionId = searchParams.get("session_id");

    async function sync() {
      if (!sessionId) {
        navigate("/");
        return;
      }

      try {
        await new Promise(r => setTimeout(r, 2000));
        
        await refreshUser();
        navigate("/assinatura");
      } catch (error) {
        console.error("Erro ao atualizar usuário:", error);
      }
    }

    sync();
  }, [searchParams, navigate, refreshUser]);

  return (
    <div style={{ padding: 40, textAlign: "center" }}>
      <h1>Pagamento confirmado 🎉</h1>
      <p>Estamos ativando sua assinatura…</p>
    </div>
  );
}
