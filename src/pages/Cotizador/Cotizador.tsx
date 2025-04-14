import { useState } from 'react';
import api from '../../services/api';
import './Cotizador.css';

const Cotizador = () => {
    const [codigo, setCodigo] = useState('');
    const [pedido, setPedido] = useState<any>(null);
    const [error, setError] = useState('');

    const buscarPedido = async () => {
    try {
        const res = await api.get(`/pedidos/codigo/${codigo}`);
        setPedido(res.data.data);
        setError('');
    } catch (err) {
        setPedido(null);
        setError('❌ No se encontró un pedido con ese código');
    }
};

    const actualizarEstado = async (nuevoEstado: 'vendido' | 'cancelado') => {
    try {
        const token = localStorage.getItem('token');
        if (!token || !pedido) return;

    const url =
        nuevoEstado === 'vendido'
        ? `/pedidos/vender/${pedido.pedido_id}`
        : `/pedidos/cancelar/${pedido.pedido_id}`;

        await api.patch(url, {}, {
        headers: { Authorization: `Bearer ${token}` }
        });

        alert(`📦 Pedido ${nuevoEstado} correctamente`);
        setPedido(null);
        setCodigo('');
    } catch (error) {
        console.error(`Error al cambiar estado a ${nuevoEstado}:`, error);
        alert('❌ No se pudo actualizar el estado del pedido');
    }
    };

return (
    <div className="cotizador-container">
      <h2>🛠 Cotizador</h2>

      <div className="busqueda-codigo">
        <input
          type="text"
          placeholder="Ingrese el código del pedido"
          value={codigo}
          onChange={(e) => setCodigo(e.target.value)}
        />
        <button onClick={buscarPedido}>🔍 Buscar</button>
      </div>

      {error && <p className="error">{error}</p>}

      {pedido && (
        <div className="detalle-pedido">
          <h3>📄 Detalles del Pedido</h3>
          <p><strong>Cliente:</strong> {pedido.cliente_nombre || pedido.nombre_cliente_manual}</p>
          <p><strong>Teléfono:</strong> {pedido.telefono}</p>
          <p><strong>Código:</strong> {pedido.codigo_unico}</p>
          <p><strong>Estado:</strong> {pedido.estado}</p>

          <div className="productos-lista">
            <h4>Productos:</h4>
            {pedido.productos.map((p: any) => (
            <div key={p.producto_id} className="producto-item">
                <p>{p.producto_nombre} - Cantidad: {p.cantidad}</p>
                <p>Precio: ${p.producto_precio.toFixed(2)}</p>
                <p>Subtotal: ${p.subtotal.toFixed(2)}</p>
            </div>
            ))}
        </div>

            <div className="acciones-pedido">
            <button className="btn-verde" onClick={() => actualizarEstado('vendido')}>
                ✅ Confirmar venta
            </button>
            <button className="btn-rojo" onClick={() => actualizarEstado('cancelado')}>
                ❌ Cancelar pedido
            </button>
            </div>
        </div>
        )}
    </div>
);
};

export default Cotizador;
