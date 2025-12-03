import React, { useState } from 'react';
import FormInput from '../components/FormInput';

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Login Submetido:', { email, password });
    // TODO: Lógica de autenticação com o backend
  };

  return (
    <div style={{ maxWidth: '400px', margin: 'auto', padding: '20px', border: '1px solid #ccc' }}>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <FormInput
          label="Email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <FormInput
          label="Senha"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit" style={{ padding: '10px', width: '100%' }}>
          Entrar
        </button>
      </form>
      <p style={{ marginTop: '1rem', textAlign: 'center' }}>
        Não tem conta? <a href="/register">Cadastre-se</a>
      </p>
    </div>
  );
};

export default LoginPage;