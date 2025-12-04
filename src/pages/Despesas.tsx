import { useState } from 'react';
import { Modal } from '../components/modal'; 

export default function Despesas() {
  const [expenseName, setExpenseName] = useState('');
  const [expenseValue, setExpenseValue] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  const [standardExpenses, setStandardExpenses] = useState([
    { name: 'Conta de Luz', value: 150.00 },
    { name: 'Internet', value: 99.90 },
  ]);

  const addExpense = () => {
    if (expenseName && expenseValue) {
      setStandardExpenses([...standardExpenses, { name: expenseName, value: parseFloat(expenseValue) }]);
      setExpenseName('');
      setExpenseValue('');
      setIsModalOpen(false); 
    }
  };

  const closeModal = () => {
      setExpenseName('');
      setExpenseValue('');
      setIsModalOpen(false);
  }

  return (
    <div style={{ padding: '20px' }}>
      <h2>Gastos Padrões Mensais</h2>
      <p>Essas informações serão usadas para prever seus gastos futuros.</p>
      <button 
        onClick={() => setIsModalOpen(true)} 
        style={{ 
          padding: '10px 20px', 
          backgroundColor: '#2ecc71', 
          color: 'white', 
          border: 'none', 
          borderRadius: '5px', 
          marginBottom: '20px',
          cursor: 'pointer'
        }}
      >
        ➕ Nova Despesa
      </button>
      <h3>Lista de Gastos Fixos</h3>
      <ul style={{ listStyle: 'none', padding: 0 }}>
        {standardExpenses.map((exp, index) => (
          <li 
            key={index} 
            style={{ 
              padding: '10px', 
              borderBottom: '1px solid #eee', 
              display: 'flex', 
              justifyContent: 'space-between'
            }}
          >
            <span>{exp.name}</span>
            <span style={{ fontWeight: 'bold' }}>R$ {exp.value.toFixed(2)}</span>
          </li>
        ))}
      </ul>
      <Modal 
        isOpen={isModalOpen}
        onClose={closeModal} 
        title="Adicionar Novo Gasto Fixo"
        expenseName={expenseName}
        setExpenseName={setExpenseName}
        expenseValue={expenseValue}
        setExpenseValue={setExpenseValue}
        onSave={addExpense}
      />
    </div>
  );
};