import { useState } from 'react';
import styles from './styles.module.css';
import { useTheme } from '@/context/ThemeContext';
import api from '@/services/api';

interface ImportModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ImportModal({ isOpen, onClose }: ImportModalProps) {
  const { theme } = useTheme();

  const [file, setFile] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
      setError(null);
    }
  };

  const handleImport = async () => {
    if (!file) {
      setError('Selecione um arquivo para importar.');
      return;
    }

    try {
      setIsLoading(true);
      setError(null);

      const formData = new FormData();
      formData.append('file', file);

      const response = await api.post('/Importacao/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      alert(response.data.mensagem || 'Importação realizada com sucesso!');
      onClose();
    } catch (err: any) {
      const mensagem =
        err?.response?.data?.erro ||
        'Erro ao importar arquivo. Verifique o formato.';
      setError(mensagem);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div
      className={styles.modalContainer}
      role="dialog"
      style={{ backgroundColor: theme.colors.background2 }}
    >
      <div className={styles.header}>
        <h3 style={{ color: theme.colors.text }}>Importar Arquivo</h3>
        <button className={styles.closeButton} onClick={onClose}>
          ×
        </button>
      </div>

      <div className={styles.dropzone}>
        <p className={styles.dropText}>
          Arraste e solte o arquivo aqui ou <span>clique para escolher</span>
        </p>

        {file && (
          <p className={styles.fileName}>
            📄 {file.name}
          </p>
        )}

        <input
          type="file"
          accept=".csv,.xlsx"
          className={styles.fileInput}
          onChange={handleFileChange}
        />
      </div>

      {error && <p className={styles.errorText}>{error}</p>}

      <div className={styles.buttonGroup}>
        <button
          onClick={onClose}
          className={styles.cancelButton}
          disabled={isLoading}
        >
          Cancelar
        </button>

        <button
          className={styles.saveButton}
          onClick={handleImport}
          disabled={isLoading}
        >
          {isLoading ? 'Importando...' : 'Importar'}
        </button>
      </div>
    </div>
  );
}
