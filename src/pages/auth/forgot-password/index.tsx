import { useState } from "react";
import type { FormEvent } from "react";
import { Link } from "react-router-dom";
import { isAxiosError } from "axios";
import api from "@/services/api";
import { useTheme } from "@/context/ThemeContext";
import styles from "./styles.module.css";

type Step = "email" | "code" | "password" | "done";

function errorMessage(error: unknown): string {
  if (isAxiosError(error)) {
    if (error.response?.status === 429) return "Muitas tentativas. Tente novamente mais tarde.";
    if (error.response?.status === 400) return "Dados inválidos ou código expirado. Confira e tente novamente.";
    if (error.response?.status === 404) return "Não foi possível validar o código informado.";
  }
  return "Não foi possível concluir a solicitação. Tente novamente.";
}

export default function RecuperarSenha() {
  const { theme } = useTheme();
  const [step, setStep] = useState<Step>("email");
  const [email, setEmail] = useState("");
  const [codigo, setCodigo] = useState("");
  const [tokenTemporario, setTokenTemporario] = useState("");
  const [novaSenha, setNovaSenha] = useState("");
  const [confirmacao, setConfirmacao] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (loading) return;
    setError("");

    if (step === "password" && novaSenha !== confirmacao) {
      setError("As senhas não coincidem.");
      return;
    }

    setLoading(true);
    try {
      if (step === "email") {
        await api.post("RecuperacaoSenha/enviar-codigo", { email: email.trim() });
        setStep("code");
      } else if (step === "code") {
        const response = await api.post<{ tokenTemporario: string }>(
          "RecuperacaoSenha/validar-codigo",
          { email: email.trim(), codigo: codigo.trim() }
        );
        if (!response.data.tokenTemporario) throw new Error("Token temporário ausente");
        setTokenTemporario(response.data.tokenTemporario);
        setStep("password");
      } else if (step === "password") {
        await api.post("Auth/alterar-senha", { tokenTemporario, novaSenha });
        setTokenTemporario("");
        setNovaSenha("");
        setConfirmacao("");
        setStep("done");
      }
    } catch (err) {
      setError(errorMessage(err));
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className={styles.page} style={{ backgroundColor: theme.colors.background, color: theme.colors.text }}>
      <section className={styles.card} style={{ backgroundColor: theme.colors.bottom }}>
        <div className={styles.symbol} aria-hidden="true">✉</div>
        <h1>{step === "done" ? "Senha alterada!" : "Recuperar senha"}</h1>
        <p className={styles.description}>
          {step === "email" && "Informe o e-mail cadastrado para receber um código de recuperação."}
          {step === "code" && "Digite o código de seis dígitos enviado para o seu e-mail."}
          {step === "password" && "Crie uma nova senha para sua conta."}
          {step === "done" && "Sua senha foi redefinida. Você já pode entrar com a nova senha."}
        </p>

        {step !== "done" && (
          <form onSubmit={submit} className={styles.form}>
            {step === "email" && (
              <label>
                E-mail
                <input type="email" autoComplete="email" value={email}
                  onChange={e => setEmail(e.target.value)} placeholder="seuemail@exemplo.com"
                  required maxLength={254} disabled={loading} />
              </label>
            )}
            {step === "code" && (
              <>
                <p className={styles.destination}>{email}</p>
                <label>
                  Código de recuperação
                  <input type="text" inputMode="numeric" autoComplete="one-time-code"
                    pattern="[0-9]{6}" maxLength={6} minLength={6} value={codigo}
                    onChange={e => setCodigo(e.target.value.replace(/\D/g, ""))}
                    placeholder="000000" required disabled={loading} />
                </label>
                <button className={styles.secondary} type="button" disabled={loading}
                  onClick={() => { setCodigo(""); setError(""); setStep("email"); }}>
                  Alterar e-mail ou reenviar código
                </button>
              </>
            )}
            {step === "password" && (
              <>
                <label>
                  Nova senha
                  <input type="password" autoComplete="new-password" value={novaSenha}
                    onChange={e => setNovaSenha(e.target.value)} minLength={6} maxLength={100}
                    required disabled={loading} />
                </label>
                <label>
                  Confirmar nova senha
                  <input type="password" autoComplete="new-password" value={confirmacao}
                    onChange={e => setConfirmacao(e.target.value)} minLength={6} maxLength={100}
                    required disabled={loading} />
                </label>
              </>
            )}
            {error && <p className={styles.error} role="alert">{error}</p>}
            <button className={styles.primary} style={{ backgroundColor: theme.colors.primary }}
              type="submit" disabled={loading}>
              {loading ? "Processando..." : step === "email" ? "Enviar código" :
                step === "code" ? "Validar código" : "Alterar senha"}
            </button>
          </form>
        )}
        <Link className={styles.back} to="/login">
          {step === "done" ? "Ir para o login" : "Voltar ao login"}
        </Link>
      </section>
    </div>
  );
}
