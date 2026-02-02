import styles from './styles.module.css';
import { useUser } from "@/context/UserContext";
import { useTheme } from '@/context/ThemeContext';

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
  const { theme } = useTheme();

  const planoAtual = usuario?.PlanoAtual;
  const isActive = planoAtual === title;

  return (
    <div
      className={`${styles.card} ${highlight ? styles.highlight : ""}`}
      style={{
        backgroundColor: theme.colors.background,
        border: highlight
          ? `2px solid ${theme.colors.primary}`
          : `1px solid ${theme.colors.bottom}`,
        color: theme.colors.text
      }}
    >
      {highlight && (
        <span
          className={styles.badge}
          style={{
            backgroundColor: theme.colors.primary,
            color: theme.colors.primary
          }}
        >
          Recomendado
        </span>
      )}

      <h2 className={styles.title} style={{ color: theme.colors.text }}>
        {title}
      </h2>

      <p className={styles.price} style={{ color: theme.colors.primary }}>
        {price}
      </p>

      {isActive && (
        <p className={styles.active} style={{ color: theme.colors.success }}>
          Plano ativo
        </p>
      )}

      <ul className={styles.features}>
        {features.map((feature, index) => (
          <li key={index} style={{ color: theme.colors.secondary }}>
            ✔ {feature}
          </li>
        ))}
      </ul>

      <button
        onClick={onAction}
        disabled={loading || isActive}
        className={styles.button}
        style={{
          backgroundColor: isActive
            ? theme.colors.inactive
            : theme.colors.primary,
          color: isActive
            ? theme.colors.secondary
            : theme.colors.primary,
          cursor: loading || isActive ? "not-allowed" : "pointer"
        }}
      >
        {loading ? "Aguarde..." : isActive ? "Plano atual" : buttonLabel}
      </button>
    </div>
  );
}
