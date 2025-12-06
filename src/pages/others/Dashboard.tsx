import styles from '@/styles/Dashboard.module.css'; 
import { Card } from '@/components/card';

export default function Dashboard() {
  const currentMonthExpenses = 100.00; 
  const standardMonthlyExpenses = 0.00; 
  const futureMonthPrediction = currentMonthExpenses * 0.8 + standardMonthlyExpenses; 

  return (
    <div className={styles.container}>
      <main className={styles.mainContent}>
        <h1 className={styles.pageTitle}>
          Dashboard Financeiro
        </h1>
        <div className={styles.kpiContainer}>
          <Card
            title="Gastos do Mês Atual"
            value={currentMonthExpenses}
            valueColor="#e74c3c"
            info="Dados de Dezembro/2025"
           />

           <Card
            title="Previsão Próximo Mês"
            value={futureMonthPrediction}
            valueColor="#3498db"
            info="Baseado em gastos padrão e média do mês atual."
           />

           <Card
            title="Balanço Geral"
            value={futureMonthPrediction}
            valueColor="#2ecc71"
            info="Receitas - Despesas (até hoje)."
           />
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
