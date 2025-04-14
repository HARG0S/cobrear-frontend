import { useEffect, useState } from 'react';
import './Carrusel.css';
import promo1 from '../../assets/promo1.png'; // Asegurate que la imagen exista

const imagenes = [promo1]; // Podés agregar más imágenes después

const Carrusel = () => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const intervalo = setInterval(() => {
      setIndex((prevIndex) => (prevIndex + 1) % imagenes.length);
    }, 4000);
    return () => clearInterval(intervalo);
  }, []);

  return (
    <div className="carrusel-container">
      <div
        className="carrusel-slider"
        style={{ transform: `translateX(-${index * 100}%)` }}
      >
        {imagenes.map((img, i) => (
          <img key={i} src={img} alt={`Slide ${i}`} className="carrusel-slide" />
        ))}
      </div>

      <div className="carrusel-indicadores">
        {imagenes.map((_, i) => (
          <span
            key={i}
            onClick={() => setIndex(i)}
            className={i === index ? 'active' : ''}
          />
        ))}
      </div>
    </div>
  );
};

export default Carrusel;
