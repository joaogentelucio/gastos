import { useEffect, useRef, useState } from 'react';
import styles from '@/styles/despesas.module.css';
import ImportModal from '@/components/import-modal';
import Modal from '@/components/modal';
import api from '@/services/api';
import { Despesa, CriarDespesaDTO } from '@/types/despesas-types';
import DespesaList from '@/components/despesa-lista';
import { Loading } from '@/components/loading';

export default function Despesas() {
  const [isLoading, setIsLoading] = useState(false);
  const [despesas, setDespesas] = useState<Despesa[]>([]);

  // Estados de UI
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isImportMenuOpen, setIsImportMenuOpen] = useState(false);
  const [isImportModalOpen, setIsImportModalOpen] = useState(false);

  // Ref para fechar dropdown ao clicar fora
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  // Estados do formulário
  const [expenseName, setExpenseName] = useState('');
  const [expenseValue, setExpenseValue] = useState('');
  const [tipoDespesa, setTipoDespesa] = useState<Despesa['TipoDespesa'] | ''>('');
  const [tipoTransacao, setTipoTransacao] = useState<Despesa['TipoTransacao'] | ''>('');
  const [parcelasTotais, setParcelasTotais] = useState('');
  const [dataPrimeiraParcela, setDataPrimeiraParcela] = useState('');

  useEffect(() => {
    carregarDespesas();
  }, []);

  // Fecha dropdown ao clicar fora
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsImportMenuOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const carregarDespesas = async () => {
    try {
      const { data } = await api.get<Despesa[]>('/Despesas/ListarDespesas');
      setDespesas(data);
    } catch (err) {
      console.error('Erro ao carregar despesas:', err);
      setDespesas([]);
    }
  };

  const handleCreateDespesa = async (novaDespesa: CriarDespesaDTO) => {
    try {
      setIsLoading(true);
      const { data } = await api.post<Despesa>(
        '/Despesas/InserirDespesa',
        novaDespesa
      );
      setDespesas(prev => [data, ...prev]);
      setIsCreateModalOpen(false);
    } catch (err) {
      console.error('Erro ao criar despesa:', err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      {isLoading && <Loading />}

      <div className={styles.topSection}>
        <h2 className={styles.title}>Minhas Despesas</h2>

        <div className={styles.splitButtonWrapper} ref={dropdownRef}>
          <div className={styles.splitButton}>
            <button
              className={styles.mainButton}
              onClick={() => {
                setIsImportMenuOpen(false);
                setIsCreateModalOpen(true);
              }}
            >
              Nova despesa
            </button>

            <button
              className={styles.arrowButton}
              onClick={() => setIsImportMenuOpen(prev => !prev)}
              aria-label="Mais opções"
            >
              ▼
            </button>
          </div>

          {isImportMenuOpen && (
            <div className={styles.dropdown}>
              <button
                onClick={() => {
                  setIsImportMenuOpen(false);
                  setIsImportModalOpen(true);
                }}
              >
                Importar arquivo
              </button>
            </div>
          )}
        </div>
      </div>

      <div className={styles.contentSection}>
        <DespesaList despesas={despesas} />
      </div>

      {/* Modal de criação */}
      <Modal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        title="Adicionar Nova Despesa"
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

      {/* Modal de importação */}
      <ImportModal
        isOpen={isImportModalOpen}
        onClose={() => setIsImportModalOpen(false)}
        onImportSuccess={carregarDespesas}
      />
    </div>
  );
}
