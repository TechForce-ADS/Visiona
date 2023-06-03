import React, { useState } from 'react';
import axios from 'axios';

function Recuperar() {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password === confirmPassword) {
      try {
        const urlParams = new URLSearchParams(window.location.search);
        const token = urlParams.get('token');

        const response = await axios.post('http://localhost:3333/api/reset-password', {
          token: token,
          newPassword: password,
        });

        if (response.status === 200) {
          // Senha redefinida com sucesso
          console.log('Senha redefinida com sucesso');
          // Redirecionar o usuário para a página de login, por exemplo
        } else {
          // Exibir mensagem de erro caso ocorra algum problema na troca de senha
          console.log('Ocorreu um erro ao redefinir a senha');
        }
      } catch (error) {
        console.log('Ocorreu um erro:', error);
      }
    } else {
      alert('As senhas não coincidem. Por favor, tente novamente.');
    }

    setPassword('');
    setConfirmPassword('');
  };

  return (
    <div>
      <h1>Redefinição de Senha</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="password">Nova senha:</label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <label htmlFor="confirmPassword">Confirmar senha:</label>
        <input
          type="password"
          id="confirmPassword"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
        />

        <button type="submit">Redefinir Senha</button>
      </form>
    </div>
  );
}

export default Recuperar;
