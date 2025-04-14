import './Footer.css';
import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="footer-container">
      <div className="footer-logo">CobreAr</div>

      <div className="footer-contact">
        <p><FaPhoneAlt /> +54 9 11 1234-5678</p>
        <p><FaEnvelope /> ventas@cobrear.com</p>
        <p><FaMapMarkerAlt /> Buenos Aires, Argentina</p>
      </div>

      <div className="footer-links">
        <a href="#">Inicio</a>
        <a href="#">Productos</a>
        <a href="#">Promociones</a>
        <a href="#">Contacto</a>
      </div>

      <div className="footer-bottom">
        © {new Date().getFullYear()} CobreAr. Todos los derechos reservados.
      </div>
    </footer>
  );
};

export default Footer;
