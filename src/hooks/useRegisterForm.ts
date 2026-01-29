import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Register } from "@/services/register-service";

export function useRegisterForm() {
  const navigate = useNavigate();

  const [fotoPerfil, setFotoPerfil] = useState<File | null>(null);
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [loading, setLoading] = useState(false);

  const validateEmail = (email: string) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.toLowerCase());

  const validatePassword = (password: string) =>
    password.length >= 8;

  const isFormValid = () =>
    nome.trim().length > 0 &&
    validateEmail(email) &&
    validatePassword(senha);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setEmailError("");

    if (!nome || !email || !senha) {
      setError("Preencha todos os campos.");
      return;
    }

    if (!validateEmail(email)) {
      setEmailError("Insira um e-mail válido.");
      return;
    }

    if (!validatePassword(senha)) {
      setError("A senha deve ter pelo menos 8 caracteres.");
      return;
    }

    setLoading(true);

    try {
      await Register(fotoPerfil, nome, email, senha);
      navigate("/login");
    } catch {
      setError("Erro ao registrar. Tente novamente.");
    } finally {
      setLoading(false);
    }
  };

  return {
    fotoPerfil,
    nome,
    email,
    senha,
    showPassword,
    error,
    emailError,
    loading,
    setFotoPerfil,
    setNome,
    setEmail,
    setSenha,
    setShowPassword,
    isFormValid,
    handleSubmit,
  };
}
