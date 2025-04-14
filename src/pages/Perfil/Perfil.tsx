import { useEffect, useState } from 'react';
import api from '../../services/api'; // 👈 importante
import './Perfil.css';

const Perfil = () => {
  const [cliente, setCliente] = useState<any>(null);
  const [pedidos, setPedidos] = useState<any[]>([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('token');

    if (!token) {
      setError('No estás autenticado');
      return;
    }

    // 🔷 PERFIL
    api.get('/usuarios/perfil', {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(res => setCliente(res.data.data))
      .catch(() => {
        setCliente(null);
        setError('No se pudo cargar tu perfil');
      });

    // 🔷 PEDIDOS
    api.get('/pedidos/cliente/mis-pedidos', {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(res => setPedidos(res.data.data || []))
      .catch(() => {
        setPedidos([]);
        setError('No se pudo cargar tu historial');
      });
  }, []);

  return (
    <div className="perfil-layout">
      {/* 🟩 Datos del perfil */}
      <div className="datos-perfil">
        <h2>Tu perfil</h2>
        {cliente ? (
          <>
            <p><strong>Usuario:</strong> {cliente.username}</p>
            <p><strong>Email:</strong> {cliente.email}</p>
            <p><strong>Rol:</strong> {cliente.rol}</p>

            {cliente.cliente && (
  <>
    <p><strong>ID de cliente:</strong> {cliente.cliente.id}</p> {/* 🔥 NUEVO */}
    <p><strong>Nombre:</strong> {cliente.cliente.nombre}</p>
    <p><strong>Teléfono:</strong> {cliente.cliente.telefono}</p>
    <p><strong>Dirección:</strong> {cliente.cliente.direccion}</p>
    <p><strong>Identificación:</strong> {cliente.cliente.identificacion}</p>
    <p><strong>Tipo de cliente:</strong> {cliente.cliente.tipo_cliente}</p>
  </>
)}

          </>
        ) : (
          <p>{error || 'Cargando...'}</p>
        )}
      </div>

      {/* 🟦 Historial de pedidos */}
      <div className="historial-pedidos">
        <h2>📦 Historial de Pedidos</h2>
        {pedidos.length === 0 ? (
          <p>No tenés pedidos registrados.</p>
        ) : (
          pedidos.map(pedido => (
            <div key={pedido.id} className="pedido-card">
              <p><strong>{pedido.codigo_unico}</strong> - {new Date(pedido.fecha).toLocaleDateString()}</p>
              <p>Estado: <span>{pedido.estado.toUpperCase()}</span></p>
              <p>Comprobante: {pedido.tipo_comprobante.toUpperCase()}</p>
              {pedido.comprobante_url && (
                <a
                  href={pedido.comprobante_url}
                  target="_blank"
                  rel="noreferrer"
                  className="boton-comprobante"
                >
                  Descargar comprobante
                </a>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Perfil;
