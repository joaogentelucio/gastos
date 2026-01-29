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
    <div
      className={styles.modalContainer}
      role="dialog"
      style={{ backgroundColor: theme.colors.background2 }}
    >
      <div className={styles.header}>
        <h3 style={{ color: theme.colors.text }}>
          Importar Arquivo
        </h3>
        <button className={styles.closeButton} onClick={onClose}>×</button>
      </div>

      <div className={styles.dropzone}>
        <p className={styles.dropText}>
          Arraste e solte o arquivo aqui ou <span>clique para escolher</span>
        </p>

        <input
          type="file"
          accept=".csv,.xlsx"
          className={styles.fileInput}
        />
      </div>

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

  );
}
