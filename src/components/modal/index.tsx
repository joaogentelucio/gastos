import styles from './styles.module.css';
import { CriarDespesaDTO } from "@/types/despesas-types";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;

  expenseName: string;
  setExpenseName: (name: string) => void;
  expenseValue: string;
  setExpenseValue: (value: string) => void;

  tipoDespesa: CriarDespesaDTO["TipoDespesa"] | ''; 
  setTipoDespesa: (type: CriarDespesaDTO["TipoDespesa"]) => void;
  tipoTransacao: CriarDespesaDTO["TipoTransacao"] | ''; 
  setTipoTransacao: (type: CriarDespesaDTO["TipoTransacao"]) => void;
  
  parcelasTotais: string; 
  setParcelasTotais: (parcels: string) => void;

  dataPrimeiraParcela: string; 
  setDataPrimeiraParcela: (date: string) => void; 

  onSave: (despesa: CriarDespesaDTO) => void;
}

export default function Modal(
  {
    isOpen, 
    onClose, 
    title, 
    expenseName, 
    setExpenseName, 
    expenseValue, 
    setExpenseValue,
    tipoDespesa,
    setTipoDespesa,
    tipoTransacao,
    setTipoTransacao,
    parcelasTotais,
    setParcelasTotais,
    dataPrimeiraParcela,
    setDataPrimeiraParcela,
    onSave 
  }: ModalProps) 
{
    
  if (!isOpen) return null;

  const showParcelasField = tipoTransacao === 'CREDITO';

  const handleSave = () => {
    if (!tipoDespesa || !tipoTransacao) return;

    const hoje = new Date().toISOString();

    const novaDespesa: CriarDespesaDTO = {
      Nome: expenseName,
      ValorTotal: parseFloat(expenseValue),
      TipoDespesa: tipoDespesa,
      TipoTransacao: tipoTransacao,
      ParcelasTotais: tipoTransacao === 'CREDITO' ? Number(parcelasTotais) : undefined,
      DataDespesa: hoje,
      DataPrimeiraParcela: tipoTransacao === 'CREDITO' ? dataPrimeiraParcela || hoje : undefined,
      CategoriaId: 1,        
      FormaPagamentoId: 1 
    };

    onSave(novaDespesa);
  };

  return (
    <>
      <div 
        className={styles.overlay}
        onClick={onClose} 
      />
      <div className={styles.modalContainer}>
        <h3>{title}</h3>
        <input
          type="text"
          placeholder="Nome da Despesa"
          value={expenseName}
          onChange={(e) => setExpenseName(e.target.value)}
          className={styles.inputField} 
        />
        <input
          type="number"
          placeholder="Valor (R$)"
          value={expenseValue}
          onChange={(e) => setExpenseValue(e.target.value)}
          className={styles.inputField}
        />
        <label className={styles.labelField}>
          Tipo de Despesa:
          <select
            value={tipoDespesa}
            onChange={(e) => setTipoDespesa(e.target.value as CriarDespesaDTO["TipoDespesa"])}
            className={styles.inputField}
          >
            <option value="" disabled>Selecione o Tipo</option>
            <option value="FIXA">Fixa</option>
            <option value="ADICIONAL">Adicional</option>
          </select>
        </label>
        <label className={styles.labelField}>
          Tipo de Transação:
          <select
            value={tipoTransacao}
            onChange={(e) => {
            const newType = e.target.value as CriarDespesaDTO["TipoTransacao"];
              setTipoTransacao(newType);
              
              if (newType !== 'CREDITO') {
                setParcelasTotais('');
              }
            }}
            className={styles.inputField}
          >
            <option value="" disabled>Selecione a Transação</option>
            <option value="DEBITO">Débito</option>
            <option value="CREDITO">Crédito</option>
          </select>
        </label>
        {showParcelasField && (
          <>
            <input
              type="number"
              placeholder="Parcelas Totais"
              value={parcelasTotais}
              onChange={(e) => setParcelasTotais(e.target.value)}
              className={styles.inputField}
              min="1"
            />
            <label className={styles.labelField}>
            Data da Primeira Parcela:
            <input
              type="date"
              value={dataPrimeiraParcela}
              onChange={(e) => setDataPrimeiraParcela(e.target.value)}
              className={styles.inputField}
            />
          </label>
        </>
        )}
        

        <div className={styles.buttonGroup}>
          <button onClick={onClose} className={styles.cancelButton}>Cancelar</button>
          <button onClick={handleSave} className={styles.saveButton}>Salvar Despesa</button>
        </div>
      </div>
    </>
  );
};