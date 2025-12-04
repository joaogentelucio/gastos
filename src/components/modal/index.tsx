import styles from './styles.module.css';


type TipoDespesa = 'fixa' | 'adicional';
type TipoTransacao = 'credito' | 'debito';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;

  expenseName: string;
  setExpenseName: (name: string) => void;
  expenseValue: string;
  setExpenseValue: (value: string) => void;

  tipoDespesa: TipoDespesa | ''; 
  setTipoDespesa: (type: TipoDespesa) => void;
  tipoTransacao: TipoTransacao | ''; 
  setTipoTransacao: (type: TipoTransacao) => void;
  
  parcelasTotais: string; 
  setParcelasTotais: (parcels: string) => void;

  dataPrimeiraParcela: string; 
  setDataPrimeiraParcela: (date: string) => void; 

  onSave: () => void;
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
    
  if (!isOpen) {
    return null;
  }

  const showParcelasField = tipoTransacao === 'credito';

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
            onChange={(e) => setTipoDespesa(e.target.value as TipoDespesa)}
            className={styles.inputField}
          >
            <option value="" disabled>Selecione o Tipo</option>
            <option value="fixa">Fixa</option>
            <option value="adicional">Adicional</option>
          </select>
        </label>
        <label className={styles.labelField}>
          Tipo de Transação:
          <select
            value={tipoTransacao}
            onChange={(e) => {
              const newType = e.target.value as TipoTransacao;
              setTipoTransacao(newType);
              
              if (newType !== 'credito') {
                setParcelasTotais('');
              }
            }}
            className={styles.inputField}
          >
            <option value="" disabled>Selecione a Transação</option>
            <option value="debito">Débito</option>
            <option value="credito">Crédito</option>
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
          <button 
            onClick={onClose} 
            className={styles.cancelButton} 
          >
            Cancelar
          </button>
          <button 
            onClick={onSave} 
            className={styles.saveButton} 
          >
            Salvar Despesa
          </button>
        </div>
      </div>
    </>
  );
};