import { Link } from 'react-router-dom';
import { FaEye, FaEyeSlash, FaEnvelope, FaPlus, FaUser } from 'react-icons/fa';
import styles from './styles.module.css';
import { useTheme } from '@/context/ThemeContext';
import { useRegisterForm } from '@/hooks/useRegisterForm';

export default function Register() {
  const { theme } = useTheme();
  const {
    fotoPerfil,
    nome,
    email,
    senha,
    papel,
    nomeFantasia,
    cnpj,
    showPassword,
    error,
    emailError,
    loading,
    setFotoPerfil,
    setNome,
    setEmail,
    setSenha,
    setPapel,
    setNomeFantasia,
    setCnpj,
    setShowPassword,
    isFormValid,
    handleSubmit
  } = useRegisterForm();


  
  return (
    <div className={styles.container} style={{ backgroundColor: theme.colors.background }}>
      <div className={styles.card} style={{ backgroundColor: theme.colors.bottom }}>

        <form onSubmit={handleSubmit} className={styles.form}>

            <div className={styles.formGroup}>
                <div className={styles.imageUploadContainer}>
                    <input
                        type="file"
                        accept="image/*"
                        id="fotoPerfil"
                        className={styles.hiddenFileInput}
                        onChange={(e) => {
                            if (e.target.files && e.target.files.length > 0) {
                            setFotoPerfil(e.target.files[0]);
                            }
                        }}
                    />
    
                    <label htmlFor="fotoPerfil" className={styles.imageCircle}>
                    {fotoPerfil ? (
                        <img
                        src={URL.createObjectURL(fotoPerfil)}
                        alt="Pré-visualização"
                        className={styles.imagePreview}
                        />
                    ) : (
                        <FaPlus className={styles.plusIcon} />
                    )}
                    </label>
                </div>
            </div>

          <div className={styles.formGroup}>
            <label className={styles.label} style={{ color: theme.colors.text }}>Nome</label>
            <div className={styles.labelWrapper} >
              <input
                type="text"
                className={styles.input}
                style={{ backgroundColor: theme.colors.bottom, color: theme.colors.inactive }}
                value={nome}
                onChange={(e) => setNome(e.target.value)}
                placeholder="Digite seu nome"
                required
              />
              <span className={styles.icon}><FaUser size={20} /></span>
            </div>
          </div>

          <div className={styles.formGroup}>
            <label className={styles.label} style={{ color: theme.colors.text }}>Email</label>
            <div className={styles.labelWrapper}>
              <input
                type="email"
                className={styles.input}
                style={{ backgroundColor: theme.colors.bottom, color: theme.colors.inactive }}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Digite seu e-mail"
                required
              />
              <span className={styles.icon}><FaEnvelope size={20} /></span>
            </div>
            {emailError && <p className={styles.error}>{emailError}</p>}
          </div>

          <div className={styles.formGroup}>
            <label className={styles.label} style={{ color: theme.colors.text }}>Senha</label>
            <div className={styles.labelWrapper}>
              <input
                type={showPassword ? 'text' : 'password'}
                className={styles.input}
                style={{ backgroundColor: theme.colors.bottom, color: theme.colors.inactive }}
                value={senha}
                onChange={(e) => setSenha(e.target.value)}
                placeholder="Digite sua senha"
                required
              />
              <span
                className={styles.icon}
                onClick={() => setShowPassword(!showPassword)}
                style={{ cursor: 'pointer' }}
              >
                {showPassword ? <FaEyeSlash size={20} /> : <FaEye size={20} />}
              </span>
            </div>
          </div>

          <div className={styles.formGroup}>
            <label className={styles.label} style={{ color: theme.colors.text }}>Tipo de Usuário</label>
            <div className={styles.labelWrapper}>
              <select
                className={styles.input}
                style={{ backgroundColor: theme.colors.bottom, color: theme.colors.inactive }}
                value={papel}
                onChange={(e) => setPapel(e.target.value)}
                required
              >
                <option value="">Selecione...</option>
                <option value="autonomo">Autônomo</option>
                <option value="empresa">Empresa</option>
                <option value="cliente">Profissional</option>
              </select>
            </div>
          </div>

          {papel === 'empresa' && (
            <>
              <div className={styles.formGroup}>
                <label className={styles.label} style={{ color: theme.colors.text }}>Nome Fantasia</label>
                <input
                  type="text"
                  className={styles.input}
                  style={{ backgroundColor: theme.colors.bottom, color: theme.colors.inactive }}
                  value={nomeFantasia}
                  onChange={(e) => setNomeFantasia(e.target.value)}
                  placeholder="Digite o nome fantasia"
                  required
                />
              </div>

              <div className={styles.formGroup}>
                <label className={styles.label} style={{ color: theme.colors.text }}>CNPJ</label>
                <input
                  type="text"
                  className={styles.input}
                  style={{ backgroundColor: theme.colors.bottom, color: theme.colors.inactive }}
                  value={cnpj}
                  onChange={(e) => setCnpj(e.target.value)}
                  placeholder="Digite o CNPJ"
                  required
                />
              </div>
            </>
          )}

          {error && <p className={styles.error}>{error}</p>}

          <div className={styles.linksRow}>
            <Link to="/profissional/login" className={styles.link} style={{ color: theme.colors.primary }}>Já tenho uma conta</Link>
          </div>

          <button
            type="submit"
            className={isFormValid() && !loading ? styles.button : styles.buttonDisabled}
            style={{
              backgroundColor: isFormValid() && !loading ? theme.colors.primary : theme.colors.inactive,
              color: theme.colors.text,
            }}
            disabled={!isFormValid() || loading}
          >
            {loading ? <span className={styles.spinner}></span> : 'Cadastrar'}
          </button>
        </form>
      </div>
    </div>
  );
}