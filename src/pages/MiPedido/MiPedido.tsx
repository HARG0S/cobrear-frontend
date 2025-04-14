import { useState, useEffect } from 'react';
import './MiPedido.css';
import { useAuth } from '../../contexts/AuthContext';
import axios from 'axios';

interface ProductoPedido {
  id: string;
  nombre: string;
  cantidad: number;
  precio: number;
  imagen?: string;
}

// ✅ Generador de código ÚNICO y mensaje (solo frontend)
const generarCodigoUnico = (): { codigo: string; mensaje: string } => {
  const fecha = new Date();
  const dia = String(fecha.getDate()).padStart(2, '0');
  const mes = String(fecha.getMonth() + 1).padStart(2, '0');
  const año = String(fecha.getFullYear());
  const aleatorio = Math.floor(10000 + Math.random() * 90000);

  const codigo = `COBR-${dia}${mes}${año}-${aleatorio}`;
  const mensaje = `Hola, acabo de hacer un pedido desde la web. Mi código es:\n${codigo}\n¿Podés cotizarlo? Gracias`;

  return { codigo, mensaje };
};

const MiPedido = () => {
  const { user } = useAuth();
  const [productos, setProductos] = useState<ProductoPedido[]>([]);
  const [nombre, setNombre] = useState('');
  const [telefono, setTelefono] = useState('');
  const [enviando, setEnviando] = useState(false);
  const [mensaje, setMensaje] = useState('');

  useEffect(() => {
    const datosGuardados = localStorage.getItem('miPedido');
    if (datosGuardados) {
      setProductos(JSON.parse(datosGuardados));
    }
  }, []);

  const actualizarCantidad = (id: string, nuevaCantidad: number) => {
    const actualizados = productos.map(prod =>
      prod.id === id ? { ...prod, cantidad: nuevaCantidad } : prod
    );
    setProductos(actualizados);
    localStorage.setItem('miPedido', JSON.stringify(actualizados));
  };

  const eliminarProducto = (id: string) => {
    const filtrados = productos.filter(prod => prod.id !== id);
    setProductos(filtrados);

    if (filtrados.length > 0) {
      localStorage.setItem('miPedido', JSON.stringify(filtrados));
    } else {
      localStorage.removeItem('miPedido');
    }

    window.dispatchEvent(new Event('storage'));
  };

  const enviarPedido = async () => {
    if (!user && (!nombre || !telefono)) {
      setMensaje('Debe ingresar nombre y teléfono');
      return;
    }

    const { codigo, mensaje: mensajeWhatsapp } = generarCodigoUnico();
    setEnviando(true);

    try {
      const payload = {
        cliente_id: user?.id || null,
        nombre_cliente_manual: user ? null : nombre,
        telefono: user ? null : telefono,
        productos: productos.map(p => ({ id: p.id, cantidad: p.cantidad })),
        metodo_pago: null,
        con_factura: false,
        tipo_comprobante: 'remito',
        codigo_unico: codigo,
      };

      await axios.post('http://localhost:3000/api/pedidos', payload);

      setMensaje(`✅ Pedido enviado. Podés copiar este texto y enviarlo por WhatsApp:\n\n${mensajeWhatsapp}`);
      localStorage.removeItem('miPedido');
      setProductos([]);
      window.dispatchEvent(new Event('storage'));
    } catch (error) {
      console.error('Error al enviar el pedido', error);
      setMensaje('❌ No se pudo enviar el pedido. Por favor, intentá de nuevo.');
    } finally {
      setEnviando(false);
    }
  };

  return (
    <div className="mi-pedido-container">
      <h2>🧾 Mi Pedido</h2>

      {productos.length === 0 ? (
        <p>No hay productos en tu pedido.</p>
      ) : (
        <div className="pedido-listado">
          {productos.map(prod => (
            <div key={prod.id} className="pedido-item">
              <img src={prod.imagen || 'https://via.placeholder.com/80'} alt={prod.nombre} />
              <div>
                <strong>{prod.nombre}</strong>
                <p>${prod.precio.toFixed(2)} x {prod.cantidad}</p>
              </div>
              <input
                type="number"
                min={1}
                value={prod.cantidad}
                onChange={(e) => actualizarCantidad(prod.id, Number(e.target.value))}
              />
              <button onClick={() => eliminarProducto(prod.id)}>Eliminar</button>
            </div>
          ))}
        </div>
      )}

      {!user && (
        <div className="datos-manuales">
          <h4>Datos para contacto:</h4>
          <input
            type="text"
            placeholder="Tu nombre"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
          />
          <input
            type="text"
            placeholder="Tu teléfono"
            value={telefono}
            onChange={(e) => setTelefono(e.target.value)}
          />
        </div>
      )}

      {mensaje && (
        <div className="mensaje">
          <pre>{mensaje}</pre>
          <button onClick={() => navigator.clipboard.writeText(mensaje)}>📋 Copiar mensaje</button>
        </div>
      )}

      {productos.length > 0 && (
        <button
          className="enviar-btn"
          onClick={enviarPedido}
          disabled={enviando}
        >
          {enviando ? 'Enviando...' : '📤 Enviar Pedido'}
        </button>
      )}
    </div>
  );
};

export default MiPedido;
