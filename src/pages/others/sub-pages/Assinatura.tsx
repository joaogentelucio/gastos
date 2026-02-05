import { useState } from "react";
import { FaCircleNotch } from "react-icons/fa";
import styles from "@/styles/assinatura.module.css";
import PlanoCard from "@/components/plano-card";
import { createCheckout, openPortal } from "@/services/billing";
import { useAuth } from "@/hooks/useAuth";

export default function Assinatura() {
  const { user, loading: authLoading } = useAuth(); 
  const [actionLoading, setActionLoading] = useState(false);
  
  if (authLoading) {
    return (
      <div className={styles.loadingContainer}>
        <FaCircleNotch className={styles.spinnerIcon} />
        <p>Sincronizando sua assinatura...</p>
      </div>
    );
  }

  const isPro = user?.planoAtual === "PRO";

   async function handleAction() {
    try {
      setActionLoading(true);
      const url = isPro ? await openPortal() : await createCheckout();

      if (url) {
        window.location.href = url;
      }
    } catch (err) {
      alert("Erro ao iniciar pagamento");
    } finally {
      setActionLoading(false);
    }
  }

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Planos</h1>

      <div className={styles.cards}>
        <PlanoCard
          title="FREE"
          price="R$ 0"
          features={[
            "Controle básico de gastos",
            "Relatórios simples"
          ]}
          buttonLabel={isPro ? "Plano Base" : "Plano Atual"}
          disabled={true}
          onAction={() => {}}
        />

        <PlanoCard
          title="PRO"
          price="R$ 9,90 / mês"
          features={[
            "Relatórios avançados",
            "Exportação de dados",
            "Suporte prioritário"
          ]}
          buttonLabel={actionLoading ? "Carregando..." : (isPro ? "Gerenciar Assinatura" : "Assinar agora")}
          loading={actionLoading}
          onAction={handleAction}
          highlight
        />
      </div>
    </div>
  );
}
