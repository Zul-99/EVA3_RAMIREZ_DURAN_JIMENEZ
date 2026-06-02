import { Link } from 'react-router-dom';

export function Footer() {
  return (
    <footer className="footer-institucional mt-auto">
      <div className="container py-5">
        <div className="row align-items-center justify-content-between">

          {/* LADO IZQUIERDO: Logo del Ministerio */}
          <div className="col-12 col-md-3 d-flex justify-content-center justify-content-md-start mb-4 mb-md-0">
            <img
              src="/gob_turismo_economia.png"
              alt="Ministerio de Economía, Fomento y Turismo - Gobierno de Chile"
              loading='lazy'
              className="footer-logo"
            />
          </div>

          {/* CENTRO: Links de Navegación */}
          <div className="col-12 col-md-6 d-flex justify-content-center mb-4 mb-md-0">
            <ul className="footer-nav">
              <li><Link to="/" className="footer-link">Inicio</Link></li>
              <li><Link to="/nosotros" className="footer-link">Nosotros</Link></li>
              <li><Link to="/servicios" className="footer-link">Servicios</Link></li>
              <li><Link to="/contacto" className="footer-link">Contacto</Link></li>
            </ul>
          </div>

          {/* LADO DERECHO: Copyright */}
          <div className="col-12 col-md-3 d-flex justify-content-center justify-content-md-end">
            <p className="footer-copy mb-0 text-center text-md-end">
              © {new Date().getFullYear()} Proviemplea Digital<br />
              <small>Municipalidad de Providencia</small>
            </p>
          </div>

        </div>
      </div>

      {/* Franja inferior azul brillante */}
      <div className="footer-franja" />
    </footer>
  );
}