import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Register  } from "@/services/authService";

export function useRegisterForm() {
  const navigate = useNavigate();

  const [fotoPerfil, setFotoPerfil] = useState<File | null>(null);
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [papel, setPapel] = useState('');
  const [nomeFantasia, setNomeFantasia] = useState('');
  const [cnpj, setCnpj] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [loading, setLoading] = useState(false);

  const validateEmail = (email: string) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.toLowerCase());

  const validatePassword = (password: string) =>
    password.length >= 8;

    const isFormValid = () =>
      nome.trim().length > 0 && 
      validateEmail(email) && 
      validatePassword(senha) &&
      papel !== '' &&
      (papel !== 'empresa' || (nomeFantasia.trim() && cnpj.trim()));

    const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault();
      setError('');
      setEmailError('');

    if (!nome || !email || !senha || !papel) {
      setError('Preencha todos os campos.');
      return;
    }

    if (!validateEmail(email)) {
      setEmailError('Insira um e-mail válido.');
      return;
    }

    if (!validatePassword(senha)) {
      setError('A senha deve ter pelo menos 8 caracteres.');
      return;
    }

    if (papel.toLowerCase() === 'profissional') {
      setError('Não é possível criar uma conta como profissional.');
      return;
    }

    if (papel === 'empresa' && (!nomeFantasia || !cnpj)) {
      setError('Preencha Nome Fantasia e CNPJ para empresas.');
      return;
    }

    setLoading(true);
    try {
      let papelEnum: "AUTONOMO" | "EMPRESA";

      switch (papel.toLowerCase()) {
        case "autonomo":
          papelEnum = "AUTONOMO";
        break;
        case "empresa":
          papelEnum = "EMPRESA";
        break;
        default:
          throw new Error("Papel inválido");
      }

      await Register(fotoPerfil, nome, email, senha, papelEnum, nomeFantasia, cnpj);
      navigate('/prestador/login');
    } catch {
      setError('Erro ao registrar. Tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  return {
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
  };
}