import { useState } from 'react';
import styles from './Perfil.module.css';
import { useUser } from '@/context/UserContext';
import { useTheme } from '@/context/ThemeContext';
import api from '@/services/api';

export default function Perfil() {
  const { usuario, setUsuario, loading } = useUser();
  const { theme } = useTheme();

  const [editingField, setEditingField] = useState<null | 'Nome' | 'Email'>(null);
  const [form, setForm] = useState({
    Nome: usuario?.Nome || '',
    Email: usuario?.Email || ''
  });
  const [saving, setSaving] = useState(false);

  if (loading) {
    return <div className={styles.loading}>Carregando perfil...</div>;
  }

  if (!usuario) {
    return <div className={styles.loading}>Usuário não encontrado</div>;
  }

  const handleSave = async (field: 'Nome' | 'Email') => {
    try {
      setSaving(true);

      // ajuste o endpoint conforme seu backend
      await api.put('/Usuario/atualizar', {
        ...usuario,
        [field]: form[field]
      });

      setUsuario({
        ...usuario,
        [field]: form[field]
      });

      setEditingField(null);
    } catch (err) {
      console.error('Erro ao atualizar perfil', err);
      alert('Erro ao salvar alteração');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div
      className={styles.container}
      style={{ backgroundColor: theme.colors.background }}
    >
      <div className={styles.card} style={{ backgroundColor: theme.colors.bottom }}>
        
        {/* Avatar */}
        <div className={styles.avatarWrapper}>
          <img
            src={usuario.FotoPerfil || '/avatar-default.png'}
            alt="Foto do perfil"
            className={styles.avatar}
          />
        </div>

        {/* Campo Nome */}
        <div className={styles.field}>
          <label>Nome</label>

          {editingField === 'Nome' ? (
            <div className={styles.editRow}>
              <input
                value={form.Nome}
                onChange={(e) => setForm({ ...form, Nome: e.target.value })}
              />
              <button
                onClick={() => handleSave('Nome')}
                disabled={saving}
              >
                Salvar
              </button>
            </div>
          ) : (
            <div className={styles.viewRow}>
              <span>{usuario.Nome}</span>
              <button onClick={() => setEditingField('Nome')}>Editar</button>
            </div>
          )}
        </div>

        {/* Campo Email */}
        <div className={styles.field}>
          <label>Email</label>

          {editingField === 'Email' ? (
            <div className={styles.editRow}>
              <input
                value={form.Email}
                onChange={(e) => setForm({ ...form, Email: e.target.value })}
              />
              <button
                onClick={() => handleSave('Email')}
                disabled={saving}
              >
                Salvar
              </button>
            </div>
          ) : (
            <div className={styles.viewRow}>
              <span>{usuario.Email}</span>
              <button onClick={() => setEditingField('Email')}>Editar</button>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
