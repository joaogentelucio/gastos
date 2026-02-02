import { useState } from "react";
import styles from "@/styles/assinatura.module.css";
import PlanoCard from "@/components/plano-card";
import { createCheckout, openPortal } from "@/services/billing";
import { useAuth } from "@/hooks/useAuth";

export default function Assinatura() {
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  
  const isPro = user?.planoAtual === "PRO";

   async function handleAction() {
    try {
      setLoading(true);

      const url = isPro
        ? await openPortal()
        : await createCheckout();

      window.location.href = url;
    } catch (err) {
      alert("Erro ao iniciar pagamento");
    } finally {
      setLoading(false);
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
          buttonLabel="Plano atual"
          onAction={() => {}}
        />

        <PlanoCard
          title="PRO"
          price="R$ XX / mês"
          features={[
            "Relatórios avançados",
            "Exportação de dados",
            "Suporte prioritário"
          ]}
          buttonLabel="Assinar agora"
          loading={loading}
          onAction={handleAction}
          highlight
        />
      </div>
    </div>
  );
}
