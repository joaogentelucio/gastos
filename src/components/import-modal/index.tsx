import styles from './styles.module.css';
import { useTheme } from '@/context/ThemeContext';

interface ImportModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ImportModal({ isOpen, onClose }: ImportModalProps) {
  const { theme } = useTheme();

  if (!isOpen) return null;

  return (
    <>
      <div className={styles.overlay} onClick={onClose} aria-hidden="true" />

      <div
        className={styles.modalContainer}
        role="dialog"
        style={{ backgroundColor: theme.colors.background2 }}
      >
        <h3 style={{ color: theme.colors.text }}>
          Importar Arquivo
        </h3>

        <input
          type="file"
          accept=".csv,.xlsx"
          className={styles.inputField}
          style={{
            backgroundColor: theme.colors.bottom,
            color: theme.colors.text
          }}
        />

        <div className={styles.buttonGroup}>
          <button
            onClick={onClose}
            className={styles.cancelButton}
          >
            Cancelar
          </button>

          <button className={styles.saveButton}>
            Importar
          </button>
        </div>
      </div>
    </>
  );
}
