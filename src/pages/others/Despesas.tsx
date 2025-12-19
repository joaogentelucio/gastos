import { useEffect, useState } from 'react';
import styles from '@/styles/despesas.module.css'
import Modal from '@/components/modal'; 
import api from '@/services/api'
import { Despesa } from "@/types/despesas-types";

export default function Despesas() {
  const [despesas, setDespesas] = useState<Despesa[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [expenseName, setExpenseName] = useState('');
  const [expenseValue, setExpenseValue] = useState('');
  const [tipoDespesa, setTipoDespesa] = useState<Despesa["tipoDespesa"] | ''>('');
  const [tipoTransacao, setTipoTransacao] = useState<Despesa["tipoTransacao"] | ''>('');
  const [parcelasTotais, setParcelasTotais] = useState('');
  const [dataPrimeiraParcela, setDataPrimeiraParcela] = useState('');

  useEffect(() => {
    carregarDespesas();
  }, []);

  const carregarDespesas = async () => {
    try {
      const { data } = await api.get<Despesa[]>("/Despesas/ListarDespesas");
      setDespesas(data);
    } catch (err) {
      console.error("Erro ao carregar despesas:", err);
    }
  };

  const handleCreateDespesa = async (
    novaDespesa: Omit<Despesa, "id" | "criadoEm" | "atualizadoEm">) => {
    try {
      await api.post("/Despesas/InserirDespesa", novaDespesa);
      carregarDespesas();  
      setIsModalOpen(false);
    } catch (err) {
      console.error("Erro ao criar despesa:", err);
    }
  };

  return (
    <div className={styles.container}>
      <button 
        className={styles.btn}
        onClick={() => setIsModalOpen(true)} 
      >
        Nova Despesa
      </button>
      
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Adicionar Novo Gasto Fixo"
        expenseName={expenseName}
        setExpenseName={setExpenseName}
        expenseValue={expenseValue}
        setExpenseValue={setExpenseValue}
        tipoDespesa={tipoDespesa} 
        setTipoDespesa={setTipoDespesa}
        tipoTransacao={tipoTransacao} 
        setTipoTransacao={setTipoTransacao}
        parcelasTotais={parcelasTotais}
        setParcelasTotais={setParcelasTotais}
        dataPrimeiraParcela={dataPrimeiraParcela}
        setDataPrimeiraParcela={setDataPrimeiraParcela}
        onSave={handleCreateDespesa}
      />
      <div className={styles.cardsContainer}>
        {despesas.length === 0 ? (
          <p>Nenhuma despesa encontrada.</p>
        ) : (
          despesas.map(d => (
            <div key={d.id} className={styles.card}>
              <h4>{d.nome}</h4>
              <p>Valor: R$ {d.valorTotal.toFixed(2)}</p>
              <p>Tipo: {d.tipoDespesa} / {d.tipoTransacao}</p>
              {d.tipoTransacao === "credito" && (
                <p>Parcelas: {d.parcelasTotais} - 1ª Parcela: {d.dataPrimeiraParcela}</p>
              )}
              <p>Data da despesa: {d.dataDespesa}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
};