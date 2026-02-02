import styles from './styles.module.css';
import { useUser } from "@/context/UserContext";

type PlanCardProps = {
  title: "FREE" | "PRO";
   price: string;
  features: string[];
  buttonLabel: string;
  loading?: boolean;
  onAction: () => void;
  highlight?: boolean;
};

export default function PlanoCard({
  title,
  price,
  features,
  buttonLabel,
  loading = false,
  onAction,
  highlight = false
}: PlanCardProps) {
  const { usuario } = useUser();

  const planoAtual = usuario?.PlanoAtual;
  const isActive = planoAtual === title;

  return (
    <div className={`${styles.card} ${highlight ? styles.highlight : ""}`}>
      {highlight && (
        <span className={styles.badge}>Recomendado</span>
      )}

      <h2 className={styles.title}>{title}</h2>

      <p className={styles.price}>{price}</p>

      {isActive && (
        <p className={styles.active}>Plano ativo</p>
      )}

      <ul className={styles.features}>
        {features.map((feature, index) => (
          <li key={index}>✔ {feature}</li>
        ))}
      </ul>

      <button
        onClick={onAction}
        disabled={loading || isActive}
        className={`${styles.button} ${
          isActive ? styles.buttonDisabled : styles.buttonPrimary
        }`}
      >
        {loading ? "Aguarde..." : isActive ? "Plano atual" : buttonLabel}
      </button>
    </div>
  );
}
