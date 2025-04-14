import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useEffect, useState } from 'react';
import './Header.css';

const Header = () => {
  const { user, logout } = useAuth();
  const [tienePedido, setTienePedido] = useState(false);

  const isCliente = user?.rol === 'cliente';
  const isVendedor = user?.rol === 'vendedor';
  const isAdmin = user?.rol === 'admin';

  useEffect(() => {
    const revisarPedido = () => {
      try {
        const pedido = JSON.parse(localStorage.getItem('miPedido') || '[]');
        setTienePedido(pedido.length > 0);
      } catch {
        setTienePedido(false);
      }
    };

    revisarPedido();
    window.addEventListener('storage', revisarPedido);

    return () => {
      window.removeEventListener('storage', revisarPedido);
    };
  }, []);

  return (
    <header className="header">
      <nav className="nav">
        <Link to="/" className="logo">CobreAr</Link>

        <div className="nav-links">
          <Link to="/">Inicio</Link>
          <Link to="/productos">Productos</Link>

          {/* Mostrar Mi Pedido a clientes o visitantes sin cuenta */}
          {(!isVendedor && !isAdmin) && (
            <Link to="/mi-pedido" className="icono-pedido">
              Mi Pedido {tienePedido && <span className="campanita">🔻</span>}
            </Link>
          )}

          {/* Opciones para cliente */}
          {isCliente && (
            <>
              <Link to="/perfil">Perfil</Link>
              <button onClick={logout}>Salir</button>
            </>
          )}

          {/* Opciones para vendedor */}
          {isVendedor && (
            <>
              <Link to="/cotizador">Cotizador</Link>
              <Link to="/stock">Stock</Link>
              <Link to="/clientes">Clientes</Link>
              <button onClick={logout}>Salir</button>
            </>
          )}

          {/* Opciones para admin */}
          {isAdmin && (
            <>
              <Link to="/admin">Panel Admin</Link>
              <button onClick={logout}>Salir</button>
            </>
          )}

          {/* Opciones para visitantes */}
          {!user && (
            <>
              <Link to="/login">Iniciar sesión</Link>
              <Link to="/register">Registrarse</Link>
            </>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Header;
