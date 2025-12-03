import React, { useState } from 'react';

const StandardExpensesPage: React.FC = () => {
  const [expenseName, setExpenseName] = useState('');
  const [expenseValue, setExpenseValue] = useState('');
  const [standardExpenses, setStandardExpenses] = useState([
    { name: 'Conta de Luz', value: 150.00 },
    { name: 'Internet', value: 99.90 },
  ]);

  const addExpense = () => {
    if (expenseName && expenseValue) {
      setStandardExpenses([...standardExpenses, { name: expenseName, value: parseFloat(expenseValue) }]);
      setExpenseName('');
      setExpenseValue('');
    }
  };

  return (
    <div>
      <h2>💸 Gastos Padrões Mensais</h2>
      <p>Essas informações serão usadas para prever seus gastos futuros.</p>

      <div style={{ border: '1px solid #ccc', padding: '15px', marginBottom: '20px' }}>
        <input
          type="text"
          placeholder="Nome do Gasto"
          value={expenseName}
          onChange={(e) => setExpenseName(e.target.value)}
          style={{ marginRight: '10px', padding: '8px' }}
        />
        <input
          type="number"
          placeholder="Valor (R$)"
          value={expenseValue}
          onChange={(e) => setExpenseValue(e.target.value)}
          style={{ marginRight: '10px', padding: '8px' }}
        />
        <button onClick={addExpense} style={{ padding: '8px 15px' }}>
          Adicionar Gasto
        </button>
      </div>

      <h3>Lista de Gastos Fixos</h3>
      <ul>
        {standardExpenses.map((exp, index) => (
          <li key={index}>
            {exp.name}: R$ {exp.value.toFixed(2)}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default StandardExpensesPage;