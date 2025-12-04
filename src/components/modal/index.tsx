import React from 'react';
import styles from './styles.module.css';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  expenseName: string;
  setExpenseName: (name: string) => void;
  expenseValue: string;
  setExpenseValue: (value: string) => void;
  onSave: () => void;
}

export const Modal: React.FC<ModalProps> = ({ 
    isOpen, 
    onClose, 
    title, 
    expenseName, 
    setExpenseName, 
    expenseValue, 
    setExpenseValue, 
    onSave 
}) => {
  if (!isOpen) {
    return null;
  }

  return (
    <>
      <div 
        className={styles.overlay}
        onClick={onClose} 
      />
      <div 
        className={styles.modalContainer}
      >
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