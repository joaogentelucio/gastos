import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useTheme } from '@/context/ThemeContext';
import styles from './styles.module.css';
import { EmailInput } from '@/components/input-auth/email-input';
import { PasswordInput } from '@/components/input-auth/password-input';
import { useLoginForm } from '@/hooks/useLoginForm';
import imgLogin from '@/assets/iconLogin.png';
import { Loading } from "@/components/loading";

export default function Login() {
  const { theme } = useTheme();
  const {
    email,
    senha,
    showPassword,
    error,
    emailError,
    loading,
    setEmail,
    setSenha,
    setShowPassword,
    isFormValid,
    handleLogin
  } = useLoginForm();

  const [didSyncAutofill, setDidSyncAutofill] = useState(false);
  
   useEffect(() => {
    const timeout = setTimeout(() => {
      const emailInput = document.querySelector('input[name="email"]') as HTMLInputElement;
      const passwordInput = document.querySelector('input[name="password"]') as HTMLInputElement;
  
      if (emailInput?.value) setEmail(emailInput.value.trim());
      if (passwordInput?.value) setSenha(passwordInput.value.trim());
  
      setDidSyncAutofill(true);
    }, 100); 
  
    return () => clearTimeout(timeout);
  }, []);
  
  return (
    <div className={styles.container} style={{ backgroundColor: theme.colors.background }}>
      {loading && <Loading />}
      <div className={styles.wrapper}>
        <div className={styles.headerWrapper}>
          <img 
            src={imgLogin}
            className={styles.fotoPerfil} 
            style={{ color: theme.colors.error, borderColor: theme.colors.primary}}
          />
        </div>    

        <form onSubmit={handleLogin} className={styles.form}>
          <div className={styles.inputWrapper}>
            <div className={styles.inputGroup} style={{ backgroundColor: theme.colors.background }}>
              <EmailInput 
                value={email} 
                onChange={setEmail} 
              />
              {emailError && <p className={styles.error}>{emailError}</p>}
            </div>

            {/* Senha */}
            <div className={styles.inputGroup}>
              <PasswordInput
                value={senha}
                onChange={setSenha}
                showPassword={showPassword}
                togglePassword={() => setShowPassword(!showPassword)}
              />
            </div>

            {/* Erro */}
            {error && <p className={styles.error}>{error}</p>}
          </div>

          
          <div className={styles.footerWrapper}>
            {/* Botão */}
            <button
              type="submit"
              disabled={!(isFormValid() || didSyncAutofill) || loading}
              className={isFormValid() && !loading ? styles.button : styles.buttonDisabled}
              style={{
                backgroundColor: isFormValid() && !loading ? theme.colors.primary : theme.colors.inactive,
                color: theme.colors.bottom
              }}
            >
              {loading ? <span className={styles.spinner}></span> : 'Entrar'}
            </button>

            {/* Links */}
            <div className={styles.forgot}>
              <Link to="/register" className={styles.link} style={{ color: theme.colors.inactive }}>Criar conta</Link>
            </div>
            <div className={styles.forgot}>
              <a href="/recuperarSenha" className={styles.link} style={{ color: theme.colors.inactive }}>Esqueceu a senha?</a>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}