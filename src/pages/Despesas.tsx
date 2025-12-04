import { useState } from 'react';
import Modal from '../components/modal'; 


type TipoDespesa = 'fixa' | 'adicional' | '';
type TipoTransacao = 'credito' | 'debito' | '';

export default function Despesas() {

    const [expenseName, setExpenseName] = useState('');
    const [expenseValue, setExpenseValue] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);

    const [tipoDespesa, setTipoDespesa] = useState<TipoDespesa>('');
    const [tipoTransacao, setTipoTransacao] = useState<TipoTransacao>('');
    const [parcelasTotais, setParcelasTotais] = useState('');
    const [dataPrimeiraParcela, setDataPrimeiraParcela] = useState('');

    const [standardExpenses, setStandardExpenses] = useState([
      { name: 'Conta de Luz', value: 150.00 },
      { name: 'Internet', value: 99.90 },
    ]);

    const resetStates = () => {
      setExpenseName('');
      setExpenseValue('');
      setTipoDespesa('');
      setTipoTransacao('');
      setParcelasTotais('');
      setDataPrimeiraParcela('');
      setIsModalOpen(false);
    }

    const addExpense = () => {
      if (expenseName && expenseValue) {
          
        setStandardExpenses([...standardExpenses, { 
          name: `${expenseName} (${tipoDespesa} - ${tipoTransacao})`, 
          value: parseFloat(expenseValue) 
        }]);
        
        resetStates(); 
      }
    };

    const closeModal = () => {
        resetStates(); 
    }

    return (
        <div style={{ padding: '20px' }}>
            <button 
              onClick={() => setIsModalOpen(true)} 
            >
              Nova Despesa
            </button>
            
            <Modal 
                isOpen={isModalOpen}
                onClose={closeModal} 
                title="Adicionar Novo Gasto Fixo"
                expenseName={expenseName}
                setExpenseName={setExpenseName}
                expenseValue={expenseValue}
                setExpenseValue={setExpenseValue}
                tipoDespesa={tipoDespesa}
                setTipoDespesa={setTipoDespesa as (type: 'fixa' | 'adicional') => void}
                tipoTransacao={tipoTransacao}
                setTipoTransacao={setTipoTransacao as (type: 'credito' | 'debito') => void}
                parcelasTotais={parcelasTotais}
                setParcelasTotais={setParcelasTotais}
                dataPrimeiraParcela={dataPrimeiraParcela}
                setDataPrimeiraParcela={setDataPrimeiraParcela}
                onSave={addExpense}
            />
        </div>
    );
};