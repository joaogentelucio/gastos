import { useEffect, useState } from 'react';
import styles from '@/styles/perfil.module.css';
import { useTheme } from '@/context/ThemeContext';
import api from '@/services/api';

interface Usuario {
  nome: string;
  email: string;
  telefone?: string;
}

export default function Perfil() {
  const { theme } = useTheme();

  const [usuario, setUsuario] = useState<Usuario | null>(null);
  const [editandoCampo, setEditandoCampo] = useState<string | null>(null);
  const [valoresEditados, setValoresEditados] = useState<Partial<Usuario>>({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    carregarUsuario();
  }, []);

  const carregarUsuario = async () => {
    try {
      const { data } = await api.get<Usuario>('/Usuario/me');
      setUsuario(data);
    } catch (error) {
      console.error('Erro ao carregar perfil', error);
    }
  };

  const iniciarEdicao = (campo: keyof Usuario) => {
    setEditandoCampo(campo);
    setValoresEditados({ [campo]: usuario?.[campo] });
  };

  const cancelarEdicao = () => {
    setEditandoCampo(null);
    setValoresEditados({});
  };

  const salvarCampo = async (campo: keyof Usuario) => {
    try {
      setLoading(true);

      await api.put('/Usuario/atualizar', {
        [campo]: valoresEditados[campo],
      });

      setUsuario(prev =>
        prev ? { ...prev, [campo]: valoresEditados[campo] } : prev
      );

      cancelarEdicao();
    } catch (error) {
      console.error('Erro ao salvar campo', error);
    } finally {
      setLoading(false);
    }
  };

  if (!usuario) return null;

  return (
    <div
      className={styles.container}
      style={{ backgroundColor: theme.colors.background }}
    >
      <div
        className={styles.card}
        style={{ backgroundColor: theme.colors.bottom }}
      >
        <h2 className={styles.title}>Meu Perfil</h2>

        {/* Campo */}
        {(['nome', 'email', 'telefone'] as (keyof Usuario)[]).map(campo => (
          <div key={campo} className={styles.field}>
            <label>{campo === 'nome' ? 'Nome' : campo === 'email' ? 'E-mail' : 'Telefone'}</label>

            {editandoCampo === campo ? (
              <div className={styles.editRow}>
                <input
                  value={valoresEditados[campo] ?? ''}
                  onChange={e =>
                    setValoresEditados({ [campo]: e.target.value })
                  }
                />

                <button
                  onClick={() => salvarCampo(campo)}
                  disabled={loading}
                  className={styles.saveBtn}
                >
                  Salvar
                </button>

                <button
                  onClick={cancelarEdicao}
                  className={styles.cancelBtn}
                >
                  Cancelar
                </button>
              </div>
            ) : (
              <div className={styles.valueRow}>
                <span>{usuario[campo] || '-'}</span>

                <button
                  className={styles.editBtn}
                  onClick={() => iniciarEdicao(campo)}
                >
                  Editar
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
