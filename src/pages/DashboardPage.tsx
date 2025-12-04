import { Sidebar } from '../components/sidebar';
import styles from '../styles/Dashboard.module.css'; 

export default function DashboardPage() {
  const currentMonthExpenses = 100.00; 
  const standardMonthlyExpenses = 0.00; 

  const futureMonthPrediction = currentMonthExpenses * 0.8 + standardMonthlyExpenses; 

  return (
    <div className={styles.container}>
      <Sidebar />
      <main className={styles.mainContent}>
        <h1 className={styles.pageTitle}>
          Dashboard Financeiro
        </h1>
        <div className={styles.kpiContainer}>
          <div className={styles.kpiCard}>
            <h3 className={styles.kpiTitle}>
              Gastos do Mês Atual
            </h3>
            <p className={`${styles.kpiValue} ${styles.valueExpense}`}>
              R$ {currentMonthExpenses.toFixed(2)}
            </p>
            <small className={styles.kpiInfo}>
              Dados de Dezembro/2025
            </small>
          </div>
          <div className={styles.kpiCard}>
            <h3 className={styles.kpiTitle}>
              Previsão Próximo Mês
            </h3>
            <p className={`${styles.kpiValue} ${styles.valuePrediction}`}>
              R$ {futureMonthPrediction.toFixed(2)}
            </p>
            <small className={styles.kpiInfo}>
              Baseado em gastos padrão e média do mês atual.
            </small>
          </div>
          <div className={styles.kpiCard}>
            <h3 className={styles.kpiTitle}>
              Balanço Geral
            </h3>
            <p className={`${styles.kpiValue} ${styles.valueBalance}`}>
              R$ 2500.00
            </p>
            <small className={styles.kpiInfo}>
              Receitas - Despesas (até hoje).
            </small>
          </div>
        </div>
        <div className={styles.reportBlock}>
          <h3>
            Gráfico de Despesas Recorrentes
          </h3>
          <div className={styles.chartPlaceholder}>
            [Placeholder para Gráfico]
          </div>
        </div>

      </main>
    </div>
  );
};
