import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import './Login.css';

const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [form, setForm] = useState({ username: '', password: '' });
  const [error, setError] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await login(form);
      navigate('/');
    } catch (err) {
      setError('Credenciales inválidas');
    }
  };

  return (
    <div className="secure-login-wrapper">
      <div className="secure-login-box">
        <h2>Acceso Autenticado</h2>

        <form onSubmit={handleSubmit}>
          <label>Usuario</label>
          <input
            type="text"
            name="username"
            value={form.username}
            onChange={handleChange}
            autoFocus
            required
          />

          <label>Contraseña</label>
          <input
            type="password"
            name="password"
            value={form.password}
            onChange={handleChange}
            required
          />

          {error && <div className="secure-login-error">{error}</div>}

          <button type="submit">Ingresar</button>
        </form>
      </div>
    </div>
  );
};

export default Login;
