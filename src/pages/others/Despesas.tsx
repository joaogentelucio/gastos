import { useEffect, useState } from 'react';
import styles from '@/styles/despesas.module.css'
import Modal from '@/components/modal'; 
import api from '@/services/api'
import { Despesa, CriarDespesaDTO } from "@/types/despesas-types";
import DespesaList from '@/components/despesa-lista';
import { Loading } from '@/components/loading';

export default function Despesas() {
  const [isLoading, setIsLoading] = useState(false);
  const [despesas, setDespesas] = useState<Despesa[]>([]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [expenseName, setExpenseName] = useState('');
  const [expenseValue, setExpenseValue] = useState('');
  const [tipoDespesa, setTipoDespesa] = useState<Despesa["TipoDespesa"] | ''>('');
  const [tipoTransacao, setTipoTransacao] = useState<Despesa["TipoTransacao"] | ''>('');
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
      setDespesas([]);
      console.error("Erro ao carregar despesas:", err);
    }
  };

  const handleCreateDespesa = async (
    novaDespesa: CriarDespesaDTO) => {
    try {
      setIsLoading(true);
      const {data} = await api.post<Despesa>("/Despesas/InserirDespesa", novaDespesa);
      setDespesas(prev => [data, ...prev]);
      setIsModalOpen(false);
    } catch (err) {
      console.error("Erro ao criar despesa:", err);
    }
    finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      {isLoading && <Loading />}
      <div className={styles.topSection}>
        <h2 className={styles.title}>Minhas Despesas</h2>
        <div className={styles.splitButton}>
          <button
            className={styles.mainButton}
            onClick={() => setIsModalOpen(true)}
          >
            Nova despesa
          </button>

          <button
            className={styles.arrowButton}
            onClick={() => setIsDropdownOpen(prev => !prev)}
            aria-label="Mais opções"
          >
            ▼
          </button>
          {isDropdownOpen && (
            <div className={styles.dropdown}>
              <button
                onClick={() => {
                  setIsModalOpen(true);
                  setIsDropdownOpen(false);
                }}
              >
                Nova despesa fixa
              </button>
            </div>
          )}
        </div>
      </div>
      
      <div className={styles.contentSection}>
        <DespesaList despesas={despesas}/>
      </div>
      
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
    </div>
  );
};