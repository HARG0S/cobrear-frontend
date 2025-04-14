import Carrusel from '../../components/Inicio/Carrusel';
import Informativo from '../../components/Inicio/Informativo';
import TarjetasProductos from '../../components/Inicio/TarjetasProductos';
import './Inicio.css';

const Inicio = () => {
return (
    <div className="inicio-container">
        <Carrusel />
        <TarjetasProductos />
        <Informativo />
    </div>
);
};

export default Inicio;
