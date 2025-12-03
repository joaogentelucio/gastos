import React from 'react';
import { Sidebar } from '../components/Sidebar';

const DashboardPage: React.FC = () => {
  const currentMonthExpenses = 100.00; 
  const standardMonthlyExpenses = 0.00; 

  const futureMonthPrediction = currentMonthExpenses * 0.8 + standardMonthlyExpenses; 

  return (
    
    <div style={{ 
      display: 'flex', 
      minHeight: '100vh', 
      backgroundColor: '#f4f7f9' 
    }}>
      <Sidebar />

      <main style={{ 
        flexGrow: 1, 
        padding: '30px 40px', 
      }}>
        <h1 style={{ 
          fontSize: '2em', 
          color: '#333', 
          marginBottom: '30px',
          fontWeight: '600'
        }}>
          🏠 Dashboard Financeiro
        </h1>

        
        <div style={{ 
          display: 'flex', 
          gap: '25px', 
          marginBottom: '40px' 
        }}>
          
          <div style={{ 
            padding: '25px', 
            border: 'none', 
            flex: 1, 
            borderRadius: '10px', 
            backgroundColor: '#ffffff', 
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.05)', 
            minWidth: '280px'
          }}>
            <h3 style={{ 
              margin: '0 0 10px 0', 
              fontSize: '1.2em', 
              color: '#555' 
            }}>
              💸 Gastos do Mês Atual
            </h3>
            <p style={{ 
              fontSize: '2.5em', 
              margin: '5px 0', 
              color: '#d9534f', 
              fontWeight: '700'
            }}>
              R$ {currentMonthExpenses.toFixed(2)}
            </p>
            <small style={{ 
              color: '#777', 
              display: 'block',
              marginTop: '5px'
            }}>
              Dados de Dezembro/2025
            </small>
          </div>
          
          <div style={{ 
            padding: '25px', 
            border: 'none', 
            flex: 1, 
            borderRadius: '10px', 
            backgroundColor: '#ffffff',
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.05)',
            minWidth: '280px'
          }}>
            <h3 style={{ 
              margin: '0 0 10px 0', 
              fontSize: '1.2em', 
              color: '#555' 
            }}>
              🔮 Previsão Próximo Mês
            </h3>
            <p style={{ 
              fontSize: '2.5em', 
              margin: '5px 0', 
              color: '#5bc0de', 
              fontWeight: '700'
            }}>
              R$ {futureMonthPrediction.toFixed(2)}
            </p>
            <small style={{ 
              color: '#777', 
              display: 'block',
              marginTop: '5px'
            }}>
              Baseado em gastos padrão e média do mês atual.
            </small>
          </div>
          
          
          <div style={{ 
            padding: '25px', 
            border: 'none', 
            flex: 1, 
            borderRadius: '10px', 
            backgroundColor: '#ffffff',
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.05)',
            minWidth: '280px'
          }}>
            <h3 style={{ 
              margin: '0 0 10px 0', 
              fontSize: '1.2em', 
              color: '#555' 
            }}>
              💰 Balanço Geral
            </h3>
            <p style={{ 
              fontSize: '2.5em', 
              margin: '5px 0', 
              color: '#5cb85c', 
              fontWeight: '700'
            }}>
              R$ 2500.00
            </p>
            <small style={{ 
              color: '#777', 
              display: 'block',
              marginTop: '5px'
            }}>
              Receitas - Despesas (até hoje).
            </small>
          </div>
        </div>
        
        <div style={{ 
          backgroundColor: '#ffffff', 
          padding: '20px', 
          borderRadius: '10px', 
          boxShadow: '0 4px 8px rgba(0, 0, 0, 0.05)'
        }}>
          <h3 style={{ 
            color: '#333', 
            marginBottom: '15px' 
          }}>
            Gráfico de Despesas Recorrentes
          </h3>
          <div style={{ 
            height: '300px', 
            backgroundColor: '#f9f9f9', 
            borderRadius: '5px', 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center', 
            color: '#aaa' 
          }}>
            [Placeholder para Gráfico]
          </div>
        </div>

      </main>
    </div>
  );
};

export default DashboardPage;