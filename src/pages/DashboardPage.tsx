import React from 'react';

const DashboardPage: React.FC = () => {
  // Dados de Exemplo (Em um app real, viriam do state/context/backend)
  const currentMonthExpenses = 1250.50;
  const standardMonthlyExpenses = 500.00; // Simulação do total de StandardExpensesPage

  const futureMonthPrediction = currentMonthExpenses * 0.8 + standardMonthlyExpenses; // Exemplo de cálculo

  return (
    <div style={{ padding: '20px' }}>
      <h2>📈 Resumo Financeiro</h2>

      <div style={{ display: 'flex', gap: '20px', marginBottom: '30px' }}>
        {/* Card de Gastos do Mês Atual */}
        <div style={{ padding: '15px', border: '1px solid #007bff', flex: 1, borderRadius: '5px' }}>
          <h3>💰 Gastos do Mês Atual</h3>
          <p style={{ fontSize: '2em', margin: '5px 0' }}>R$ {currentMonthExpenses.toFixed(2)}</p>
          <small>Dados de Dezembro/2025</small>
        </div>

        {/* Card de Previsão de Gastos */}
        <div style={{ padding: '15px', border: '1px solid #28a745', flex: 1, borderRadius: '5px' }}>
          <h3>🔮 Previsão Próximo Mês</h3>
          <p style={{ fontSize: '2em', margin: '5px 0' }}>R$ {futureMonthPrediction.toFixed(2)}</p>
          <small>Baseado em gastos padrão e média do mês atual.</small>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;