import styles from './styles.module.css';

type PlanCardProps = {
  title: string;
  price: string;
  features: string[];
  isActive: boolean;
  buttonLabel: string;
  loading?: boolean;
  onAction: () => void;
  highlight?: boolean;
};

export default function PlanoCard({
  title,
  price,
  features,
  isActive,
  buttonLabel,
  loading = false,
  onAction,
  highlight = false
}: PlanCardProps) {
  return (
    <div
      className={`${styles.card} ${highlight ? styles.highlight : ""}`}
    >
      {highlight && (
        <span className={styles.badge}>
          Recomendado
        </span>
      )}

      <h2 className={styles.title}>{title}</h2>

      <p className={styles.price}>{price}</p>

      {isActive && (
        <p className={styles.active}>
          Plano ativo
        </p>
      )}

      <ul className={styles.features}>
        {features.map((feature, index) => (
          <li key={index}>✔ {feature}</li>
        ))}
      </ul>

      <button
        onClick={onAction}
        disabled={loading}
        className={`${styles.button} ${
          isActive ? styles.buttonDisabled : styles.buttonPrimary
        }`}
      >
        {loading ? "Aguarde..." : buttonLabel}
      </button>
    </div>
  );
}
