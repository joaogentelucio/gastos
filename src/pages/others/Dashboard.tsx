import { useState, useEffect } from 'react';
import styles from '@/styles/Dashboard.module.css'; 
import { useTheme } from '@/context/ThemeContext';
import api from "@/services/api";
import { Card } from '@/components/card';
import { GraficoCategoriasTeste } from '@/components/graficoCategorias/teste';
import { GraficoCategorias } from '@/components/graficoCategorias';

export default function Dashboard() {
  const { theme } = useTheme();
  const [currentMonthExpenses, setCurrentMonthExpenses] = useState(0);
  const [futureMonthPrediction, setFutureMonthPrediction] = useState<number>(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [resTotal, resPrevisao] = await Promise.all([
          api.get("Despesas/total-mes-atual"),
          api.get("Despesas/previsao-proximo-mes")
        ]);

        setCurrentMonthExpenses(resTotal.data.TotalMes);
        setFutureMonthPrediction(resPrevisao.data.PrevisaoMesSeguinte);
      } catch (error) {
        console.error("Erro ao carregar dados da Dashboard:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value);
  };

  return (
    <div className={styles.container} style={{ backgroundColor: theme.colors.background }}>
      <main className={styles.mainContent}>
        
        <div className={styles.kpiContainer}>
          <Card
            title="Gastos do Mês Atual"
            value={loading ? "Carregando..." : formatCurrency(currentMonthExpenses)}
            valueColor="#e74c3c"
            info={`Dados de ${new Date().toLocaleString('pt-BR', { month: 'long', year: 'numeric' })}`}
          />

          <Card
            title="Previsão Próximo Mês"
            value={loading ? "Carregando..." : formatCurrency(futureMonthPrediction)}
            valueColor="#3498db"
            info="Baseado em gastos padrão e média do mês atual."
          />

          <Card
            title="Balanço Geral"
            value={loading ? "..." : formatCurrency(futureMonthPrediction)} // Ajuste aqui se houver outra lógica
            valueColor="#2ecc71"
            info="Receitas - Despesas (até hoje)."
          />
        </div>

        <GraficoCategoriasTeste />
        <GraficoCategorias />
        
        <div className={styles.reportBlock} style={{ backgroundColor: theme.colors.bottom }}>
          <h3 style={{ color: theme.colors.primary }}>Gráfico de Despesas Recorrentes</h3>
          <div className={styles.chartPlaceholder} style={{ backgroundColor: theme.colors.background2 }}>
            [Placeholder para Gráfico]
          </div>
        </div>
      </main>
    </div>
  );
}