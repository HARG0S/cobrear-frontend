import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import './Register.css';

const Register = () => {
  const { register } = useAuth();
  const navigate = useNavigate();

  const [mostrarFormulario, setMostrarFormulario] = useState(false);
  const [form, setForm] = useState({
    username: '',
    email: '',
    password: '',
    rol: 'cliente',
    nombre: '',
    telefono: '',
    direccion: '',
    identificacion: '',
    tipo_cliente: 'particular'
  });

  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await register(form);
      navigate('/login');
    } catch (err) {
      setError('Error al registrar el usuario');
    }
  };

  return (
    <div className="register-wrapper">
      <div className="register-info">
        <h1>Bienvenido a CobreAr</h1>
        <p>Al registrarte podés:</p>
        <ul>
          <li>✔️ Realizar pedidos directamente</li>
          <li>✔️ Guardar tu historial de compras</li>
          <li>✔️ Acceder a precios actualizados</li>
          <li>✔️ Seguir tus presupuestos</li>
        </ul>
        <p className="registro-nota">* Todos los registros son clientes. Si sos parte del equipo de ventas, tu cuenta será creada por un administrador.</p>
      </div>

      <div className="register-form">
        <h2>Registro</h2>

        {!mostrarFormulario ? (
          <>
            <p className="registro-indicacion">
              Presioná <strong>Registrarse</strong>, completá tus datos y empezá a disfrutar de tu cuenta con nosotros.
            </p>
            <button className="btn-verde-grande" onClick={() => setMostrarFormulario(true)}>
              Registrarse
            </button>
          </>
        ) : (
          <form onSubmit={handleSubmit} className="form-desplegado">
            <label>Usuario</label>
            <input type="text" name="username" value={form.username} onChange={handleChange} required />

            <label>Correo electrónico</label>
            <input type="email" name="email" value={form.email} onChange={handleChange} required />

            <label>Contraseña</label>
            <div className="password-wrapper">
              <input
                type={showPassword ? 'text' : 'password'}
                name="password"
                value={form.password}
                onChange={handleChange}
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="toggle-password"
              >
                {showPassword ? 'Ocultar' : 'Mostrar'}
              </button>
            </div>

            <label>Nombre completo / Razón social</label>
            <input type="text" name="nombre" value={form.nombre} onChange={handleChange} required />

            <label>Teléfono</label>
            <input type="text" name="telefono" value={form.telefono} onChange={handleChange} required />

            <label>Dirección</label>
            <input type="text" name="direccion" value={form.direccion} onChange={handleChange} required />

            <label>DNI o CUIT</label>
            <input type="text" name="identificacion" value={form.identificacion} onChange={handleChange} required />

            <label>¿Registrarte como?</label>
            <select name="tipo_cliente" value={form.tipo_cliente} onChange={handleChange}>
              <option value="particular">Particular</option>
              <option value="empresa">Empresa</option>
            </select>

            {error && <p className="register-error">{error}</p>}
            <button type="submit">Confirmar registro</button>
          </form>
        )}
      </div>
    </div>
  );
};

export default Register;
