import { useEffect, useState } from 'react';
import axios from 'axios';
import './Productos.css';
import elastomericaImg from '../../assets/elastomerica.png';

type Producto = {
  id: string;
  nombre: string;
  descripcion: string | null;
  precio: number;
  categoria_id: string;
  stock?: number;
  imagen?: string;
  medidas?: string;
};

type ProductoPedido = {
  id: string;
  nombre: string;
  cantidad: number;
  precio: number;
  imagen?: string;
};

type Categoria = {
  id: string;
  nombre: string;
  productos: Producto[];
};

const Productos = () => {
  const [categorias, setCategorias] = useState<Categoria[]>([]);
  const [categoriaAbierta, setCategoriaAbierta] = useState<string | null>(null);
  const [productoSeleccionado, setProductoSeleccionado] = useState<string | null>(null);

  useEffect(() => {
    axios.get('http://localhost:3000/api/productos/agrupados')
      .then(res => setCategorias(res.data.data))
      .catch(err => console.error('Error al cargar productos agrupados', err));
  }, []);

  const toggleCategoria = (id: string) => {
    setCategoriaAbierta(prev => (prev === id ? null : id));
    setProductoSeleccionado(null);
  };

  const toggleProducto = (id: string) => {
    setProductoSeleccionado(prev => (prev === id ? null : id));
  };

  const agregarAlPedido = (producto: Producto) => {
    const cantidadInput = document.querySelector(
      `#cantidad-${producto.id}`
    ) as HTMLInputElement;

    const cantidad = Number(cantidadInput?.value || 1);
    if (cantidad < 1) return;

    const pedidoActual = JSON.parse(localStorage.getItem('miPedido') || '[]');

    const indexExistente = pedidoActual.findIndex((item: ProductoPedido) => item.id === producto.id);

    if (indexExistente >= 0) {
      pedidoActual[indexExistente].cantidad += cantidad;
    } else {
      pedidoActual.push({
        id: producto.id,
        nombre: producto.nombre,
        precio: producto.precio,
        cantidad: cantidad,
        imagen: producto.imagen,
      });
    }

    localStorage.setItem('miPedido', JSON.stringify(pedidoActual));
    window.dispatchEvent(new Event('storage'));

    alert(`🧾 Se agregó "${producto.nombre}" al pedido`);
  };

  return (
    <div className="productos-container">
      {categorias.map((categoria) => (
        <div key={categoria.id} className="categoria-bloque">
          <div className="categoria-header" onClick={() => toggleCategoria(categoria.id)}>
            <h3>{categoria.nombre}</h3>
          </div>

          {categoriaAbierta === categoria.id && (
            <div className="productos-listado">
              {categoria.productos.map((prod) => {
                const mostrarImagen =
                  prod.imagen ||
                  (categoria.nombre === 'Aislaciones Elastoméricas' ? elastomericaImg : '');

                return (
                  <div key={prod.id} className="producto-item">
                    <div className="producto-nombre" onClick={() => toggleProducto(prod.id)}>
                      ▪ {prod.nombre}
                    </div>

                    {productoSeleccionado === prod.id && (
                      <div className="producto-detalle">
                        <div className="detalle-grid">

                          {/* Imagen */}
                          <div className="detalle-imagen">
                            <img src={mostrarImagen} alt={prod.nombre} />
                          </div>

                          {/* Descripción */}
                          <div className="detalle-descripcion">
                            <h4>{prod.nombre}</h4>
                            <p>{prod.descripcion}</p>
                          </div>

                          {/* Datos y acciones */}
                          <div className="detalle-datos">
                            <p><strong>💲 Precio sin IVA:</strong> ${prod.precio.toFixed(2)}</p>
                            <p><strong>📦 Disponibilidad:</strong> {prod.stock ? `${prod.stock} unidades` : 'Sin stock'}</p>
                            {prod.medidas && <p><strong>📏 Medidas:</strong> {prod.medidas}</p>}

                            <div className="acciones">
                              <input
                                id={`cantidad-${prod.id}`}
                                type="number"
                                min={1}
                                max={prod.stock || 1}
                                defaultValue={1}
                              />
                              <button onClick={() => agregarAlPedido(prod)}>
                                Agregar a pedido
                              </button>
                            </div>

                            <span className="aviso-cantidad">Seleccioná cantidad para agregar</span>
                          </div>

                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default Productos;
