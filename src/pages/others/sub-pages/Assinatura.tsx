import { useState } from "react";
import { FaCircleNotch, FaInfoCircle } from "react-icons/fa";
import styles from "@/styles/assinatura.module.css";
import PlanoCard from "@/components/plano-card";
import { createCheckout, openPortal } from "@/services/billing";
import { useUser } from "@/context/UserContext";

export default function Assinatura() {
  const { usuario, loading } = useUser(); 
  const [actionLoading, setActionLoading] = useState(false);

  const isPro = usuario?.PlanoAtual === "PRO";
  const isPendingCancellation = isPro && usuario?.RenovaAutomatico === false;
  
  if (loading) {
    return (
      <div className={styles.loadingContainer}>
        <FaCircleNotch className={styles.spinnerIcon} />
        <p>Sincronizando sua assinatura...</p>
      </div>
    );
  }

  if (loading) {
    return (
      <div className={styles.loadingContainer}>
        <FaCircleNotch className={styles.spinnerIcon} />
        <p>Sincronizando sua assinatura...</p>
      </div>
    );
  }

  async function handleAction() {
    try {
      setActionLoading(true);
      const url = isPro ? await openPortal() : await createCheckout();

      if (url) {
        window.location.href = url;
      }
    } catch (err) {
      alert("Erro ao iniciar pagamento");
      console.error(err);
    } finally {
      setActionLoading(false);
    }
  }

  const getProButtonLabel = () => {
    if (actionLoading) return "Carregando...";
    if (isPendingCancellation) return "Reativar Assinatura";
    if (isPro) return "Gerenciar Plano";
    return "Assinar agora";
  };

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1 className={styles.title}>Escolha seu Plano</h1>
        <p className={styles.subtitle}>Gerencie sua assinatura e acesse recursos exclusivos.</p>
      </header>

      {/* Banner de Alerta: Aparece apenas quando a renovação está desligada */}
      {isPendingCancellation && (
        <div className={styles.pendingAlert}>
          <FaInfoCircle />
          <div className={styles.alertText}>
            <strong>Cancelamento em processamento:</strong>
            <p>Sua assinatura PRO está ativa, mas não será renovada. Você terá acesso aos recursos até o fim do ciclo atual.</p>
          </div>
        </div>
      )}

      <div className={styles.cards}>
        <PlanoCard
          title="FREE"
          price="R$ 0"
          features={[
            "Controle básico de gastos",
            "Relatórios simples",
            "Acesso via Web"
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
            "Exportação de dados (CSV/Excel)",
            "Suporte prioritário",
            "Sem anúncios"
          ]}
          buttonLabel={getProButtonLabel()}
          loading={actionLoading}
          onAction={handleAction}
          highlight={isPro && !isPendingCancellation} // Remove o destaque se estiver cancelado
        />
      </div>
    </div>
  );
}
