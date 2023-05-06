import { Link } from "react-router-dom";

import "../Styles/Landing.scss";

export default function Landing() {
  return (
    <div className="Landing">
      <div className="fondo2">
        <div className="principalbox">
          <div className="boxint">
            <ul>
              <li>Compara precios entre productos</li>
              <li>Recibe estadísticas de tus compras</li>
              <li>Guarda tus productos favoritos</li>
              <li>Crea listas de compras</li>
            </ul>
          </div>
          <Link to="/home" className="CleanLink ButtonLink">
            ¡Vamos!
          </Link>
        </div>
        <div className="rectangulo"></div>
      </div>
    </div>
  );
}
