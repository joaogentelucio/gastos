import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "@/context/UserContext";
import { Login } from "@/services/authService";

export function useLoginForm() {
  const navigate = useNavigate();
  const { setUsuario } = useUser();

  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [loading, setLoading] = useState(false);

  const validateEmail = (email: string) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.toLowerCase());

  const validatePassword = (password: string) =>
    password.length >= 8;

  const isFormValid = () => validateEmail(email) && validatePassword(senha);

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setError('');
    setEmailError('');

    if (!email || !senha) {
      setError('Por favor, preencha todos os campos.');
      return;
    }

    if (!validateEmail(email)) {
      setEmailError('Por favor, insira um e-mail válido.');
      return;
    }

    if (!validatePassword(senha)) {
      setError('A senha deve ter pelo menos 8 caracteres.');
      return;
    }

    setLoading(true);
    try {
      const response = await Login(email, senha);
      const { accessToken, usuario, qrCode } = response;

      setUsuario({...usuario, accessToken, qrCode});

      console.log('Login bem-sucedido. Usuário:', usuario, qrCode);

      navigate('/app/dashboard');
    } catch (err) {
      setError('Falha na autenticação. Verifique suas credenciais.');
    } finally {
      setLoading(false);
    }
  };

  return {
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
  };
}