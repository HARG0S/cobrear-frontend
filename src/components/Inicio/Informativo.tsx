import React from 'react';
import './Informativo.css';
import * as FaIcons from 'react-icons/fa';

const Informativo: React.FC = () => {
  return (
    <section className="informativo-container">

      <div className="informativo-row">
        <div className="informativo-icon"><FaIcons.FaHeadset /></div>
        <div className="informativo-content">
          <h4>Atención Personalizada</h4>
          <p>
            Nuestro equipo está listo para responder todas tus dudas y ofrecerte asesoramiento experto en cada paso.
          </p>
        </div>
      </div>

      <div className="informativo-row">
        <div className="informativo-icon"><FaIcons.FaTruckMoving /></div>
        <div className="informativo-content">
          <h4>Envíos Rápidos y Confiables</h4>
          <p>
            Entregas de manera segura y eficiente, para que tus pedidos lleguen en perfectas condiciones.
          </p>
        </div>
      </div>

      <div className="informativo-row">
        <div className="informativo-icon"><FaIcons.FaMoneyCheckAlt /></div>
        <div className="informativo-content">
          <h4>Métodos de Pago Seguros</h4>
          <p>
            Pagá de manera rápida y confiable. Ofrecemos opciones simples y seguras adaptadas a tus necesidades.
          </p>
        </div>
      </div>

      <div className="informativo-row">
        <div className="informativo-icon"><FaIcons.FaShieldAlt /></div>
        <div className="informativo-content">
          <h4>Garantía de Calidad</h4>
          <p>
            Probados y certificados para brindarte el mejor rendimiento y durabilidad.
          </p>
        </div>
      </div>

    </section>
  );
};

export default Informativo;
