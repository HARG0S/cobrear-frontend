import React from 'react';
import './TarjetasProductos.css';

const productos = [
  {
    titulo: 'Caños de Cobre',
    descripcion: 'Caños de alta calidad para refrigeración.',
    imagen: require('../../assets/cobre.png'), 
  },
  {
    titulo: 'aislaciones',
    descripcion: 'Aislante eficiente contra humedad y condensación.',
    imagen: require('../../assets/aislacion.png'),
  },
  {
    titulo: 'Aire Acondicionado',
    descripcion: 'Aires acondicionados de alta eficiencia.',
    imagen: require('../../assets/aire.png'),
  },
  {
    titulo: 'Refrigerantes',
    descripcion: 'Refrigerantes para carga y mantenimiento de equipos.',
    imagen: require('../../assets/refrigerantes.png'),
  },
  {
    titulo: 'kits de instalacion',
    descripcion: 'Todo tipo de accesorios para refrigeración.',
    imagen: require('../../assets/kit.png'),
  },
];

const TarjetasProductos: React.FC = () => {
  return (
    <section className="tarjetas-container">
      {productos.map((producto, index) => (
        <div className="tarjeta-producto" key={index}>
          <img
            src={producto.imagen}
            alt={producto.titulo}
            className="imagen-producto"
          />
          <div className="tarjeta-info">
            <h3>{producto.titulo}</h3>
            <a href="#">{producto.descripcion}</a>
          </div>
        </div>
      ))}
    </section>
  );
};

export default TarjetasProductos;
