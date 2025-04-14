import { useState, useEffect } from 'react';
import api from '../../services/api';
import './Clientes.css';

const Clientes = () => {
  const [clientes, setClientes] = useState<any[]>([]);
  const [busqueda, setBusqueda] = useState({ id: '', nombre: '', identificacion: '' });
  const [perfil, setPerfil] = useState<any>(null);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchClientes = async () => {
      try {
        const res = await api.get('/usuarios');
        const soloClientes = res.data.data.filter((u: any) => u.rol === 'cliente');
        setClientes(soloClientes);
      } catch (err) {
        console.error('Error al cargar clientes:', err);
      }
    };
    fetchClientes();
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setBusqueda({ ...busqueda, [e.target.name]: e.target.value });
  };

  const verPerfil = async (id: number) => {
    try {
      const res = await api.get(`/clientes/perfil/${id}`);
      setPerfil(res.data.data);
      setError('');
    } catch (err) {
      console.error('Error al obtener perfil:', err);
      setPerfil(null);
      setError('No se pudo obtener el perfil del cliente.');
    }
  };

  const clientesFiltrados = clientes.filter((c) => {
    const coincideId = !busqueda.id || String(c.cliente_id).includes(busqueda.id);
    const coincideNombre = !busqueda.nombre || c.nombre?.toLowerCase().includes(busqueda.nombre.toLowerCase());
    const coincideIdent = !busqueda.identificacion || c.identificacion?.includes(busqueda.identificacion);
    return coincideId && coincideNombre && coincideIdent;
  });

  return (
    <div className="perfil-layout">

      {/* 🔴 1 - Buscador */}
      <div className="busqueda-panel">
        <h2>🔍 Buscar cliente</h2>
        <div className="busqueda-form">
          <input type="text" name="id" placeholder="ID" value={busqueda.id} onChange={handleInputChange} />
          <input type="text" name="nombre" placeholder="Nombre" value={busqueda.nombre} onChange={handleInputChange} />
          <input type="text" name="identificacion" placeholder="DNI / CUIT" value={busqueda.identificacion} onChange={handleInputChange} />
        </div>
      </div>

      {/* 🟢 2 - Listado de resultados */}
      <div className="clientes-listado-contenedor">
        <h2 className="titulo-morado">👥 Clientes registrados</h2>
        {clientesFiltrados.length > 0 ? (
          clientesFiltrados.map((c) => (
            <div key={c.id} className="cliente-item">
              <p>| <strong>{c.email}</strong> | ID: {c.cliente_id}</p>
              <button className="boton-ver" onClick={() => verPerfil(c.cliente_id)}>🔍 Ver perfil</button>
            </div>
          ))
        ) : (
          <p>No hay coincidencias.</p>
        )}
      </div>

      {/* 🟠 3 - Perfil y pedidos del cliente */}
      {perfil && (
        <div className="seccion-perfil-y-pedidos">
          <div className="datos-perfil">
            <h2>🧍 Perfil del cliente</h2>
            <p><strong>Usuario:</strong> {perfil.username}</p>
            <p><strong>Correo electrónico:</strong> {perfil.email}</p>
            <p><strong>Rol:</strong> {perfil.rol}</p>
            <br />
            <p><strong>Nombre:</strong> {perfil.cliente.nombre}</p>
            <p><strong>Teléfono:</strong> {perfil.cliente.telefono}</p>
            <p><strong>Dirección:</strong> {perfil.cliente.direccion}</p>
            <p><strong>Identificación:</strong> {perfil.cliente.identificacion}</p>
            <p><strong>Tipo de cliente:</strong> {perfil.cliente.tipo_cliente}</p>
          </div>

          <div className="historial-pedidos">
            <h2>📦 Historial de pedidos</h2>
            {perfil.pedidos.length > 0 ? (
              perfil.pedidos.map((pedido: any) => (
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
            ) : (
              <p>No tenés pedidos registrados.</p>
            )}
          </div>
        </div>
      )}

      {error && <p className="error">{error}</p>}
    </div>
  );
};

export default Clientes;
