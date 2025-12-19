import styles from './styles.module.css';
import { Despesa } from "@/types/despesas-types";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;

  expenseName: string;
  setExpenseName: (name: string) => void;
  expenseValue: string;
  setExpenseValue: (value: string) => void;

  tipoDespesa: Despesa["tipoDespesa"] | ''; 
  setTipoDespesa: (type: Despesa["tipoDespesa"]) => void;
  tipoTransacao: Despesa["tipoTransacao"] | ''; 
  setTipoTransacao: (type: Despesa["tipoTransacao"]) => void;
  
  parcelasTotais: string; 
  setParcelasTotais: (parcels: string) => void;

  dataPrimeiraParcela: string; 
  setDataPrimeiraParcela: (date: string) => void; 

  onSave: (despesa: Omit<Despesa, "id" | "criadoEm" | "atualizadoEm">) => void;
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

  const showParcelasField = tipoTransacao === 'credito';

  const handleSave = () => {
    const valorTotal = parseFloat(expenseValue);
    const parcelas = tipoTransacao === "credito" ? parseInt(parcelasTotais) : 1;

    const novaDespesa: Omit<Despesa, "id" | "criadoEm" | "atualizadoEm"> = {
      nome: expenseName,
      valorTotal,
      tipoDespesa: tipoDespesa as Despesa["tipoDespesa"],
      tipoTransacao: tipoTransacao as Despesa["tipoTransacao"],
      parcelasTotais: parcelas,
      dataPrimeiraParcela: dataPrimeiraParcela || new Date().toISOString().split("T")[0],
      dataDespesa: new Date().toISOString().split("T")[0],
      fkIdUsuario: 1, 
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
            onChange={(e) => setTipoDespesa(e.target.value as Despesa["tipoDespesa"])}
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
            const newType = e.target.value as Despesa["tipoTransacao"];
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
          <button onClick={onClose} className={styles.cancelButton}>Cancelar</button>
          <button onClick={handleSave} className={styles.saveButton}>Salvar Despesa</button>
        </div>
      </div>
    </>
  );
};