import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import './Login.jsx';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [erro, setErro] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setErro('');

    try {
      await login(username, password);
      navigate('/livros');
    } catch (err) {
      setErro('Usuário ou senha inválidos');
    }
  };

  return (
    <div className="login-page">
      <form className="login-card" onSubmit={handleSubmit}>
        <h1>Catálogo de Livros</h1>
        <p className="login-subtitle">Entre na sua conta</p>

        {erro && <p className="login-erro">{erro}</p>}

        <label htmlFor="username">Usuário</label>
        <input
          id="username"
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />

        <label htmlFor="password">Senha</label>
        <input
          id="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button type="submit">Entrar</button>

        <p className="login-footer">
          Não tem conta? <Link to="/registrar">Criar conta</Link>
        </p>
      </form>
    </div>
  );
}

export default Login;