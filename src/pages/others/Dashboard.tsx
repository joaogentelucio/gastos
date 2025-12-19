import { useState, useEffect } from 'react';
import styles from '@/styles/Dashboard.module.css'; 
import api from "@/services/api";
import { Card } from '@/components/card';

export default function Dashboard() {
  const [currentMonthExpenses, setCurrentMonthExpenses] = useState(0);
  const [loading, setLoading] = useState(true);

  const [futureMonthPrediction, setFutureMonthPrediction] = useState<number>(0);
  const [loadingPrediction, setLoadingPrediction] = useState(true);

  useEffect(() => {
    const fetchTotalDespesas = async () => {
      try {
        const token = localStorage.getItem('token'); 
        
        const response = await api.get("Despesas/total-mes-atual", {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setCurrentMonthExpenses(response.data.TotalMes);
      } catch (error) {
        console.error("Erro ao buscar despesas:", error);
      } finally {
        setLoading(false);
      }
    };
      fetchTotalDespesas();
  }, []);

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value);
  };

  useEffect(() => {
    const fetchPrevisao = async () => {
      try {
        const token = localStorage.getItem('token'); 
        const response = await api.get("Despesas/previsao-proximo-mes", {
            headers: { Authorization: `Bearer ${token}` }
        });
        setFutureMonthPrediction(response.data.PrevisaoMesSeguinte);
      } catch (error) {
        console.error("Erro ao buscar previsão:", error);
      } finally {
        setLoadingPrediction(false);
      }
    };

    fetchPrevisao();
  }, []);

  return (
    <div className={styles.container}>
      <main className={styles.mainContent}>
        <h1 className={styles.pageTitle}>
          Dashboard Financeiro
        </h1>
        <div className={styles.kpiContainer}>
          <Card
            title="Gastos do Mês Atual"
            value={loading ? "Carregando..." : formatCurrency(currentMonthExpenses)}
            valueColor="#e74c3c"
            info={`Dados de ${new Date().toLocaleString('pt-BR', { month: 'long', year: 'numeric' })}`}
           />

           <Card
            title="Previsão Próximo Mês"
            value={loadingPrediction ? "Carregando..." : formatCurrency(futureMonthPrediction)}
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
