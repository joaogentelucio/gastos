import { useNavigate } from "react-router-dom";

export default function Cancel() {
  const navigate = useNavigate();

  return (
    <div style={{ padding: 40, textAlign: "center" }}>
      <h1>Pagamento cancelado</h1>
      <p>Nenhuma cobrança foi realizada.</p>

      <button onClick={() => navigate("/assinatura")}>
        Voltar
      </button>
    </div>
  );
}
