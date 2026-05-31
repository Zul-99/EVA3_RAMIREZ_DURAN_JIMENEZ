import 'bootstrap/dist/css/bootstrap.min.css';
import { useState } from 'react'; // 1. Importamos useState para controlar el menú
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { Inicio } from './pages/Inicio';
import { Nosotros } from './pages/Nosotros';
import { Servicios } from './pages/Servicios';
import { Contacto } from './pages/Contacto';

function App() {
  // 2. Estado para saber si el menú está abierto (true) o cerrado (false)
  const [menuAbierto, setMenuAbierto] = useState(false);

  // Función para alternar el menú (abrir/cerrar) al presionar el botón
  const toggleMenu = () => {
    setMenuAbierto(!menuAbierto);
  };

  // Función para cerrar la lista inmediatamente cuando se hace clic en una página
  const cerrarMenu = () => {
    setMenuAbierto(false);
  };

  return (
    <Router>
      {/* Navbar Institucional */}
      <nav className="navbar navbar-expand-lg navbar-dark navbar-personalizada shadow">
        <div className="container d-flex justify-content-between align-items-center">
          
          {/* LADO IZQUIERDO: Logo Corporativo + Nombre */}
          <Link className="navbar-brand d-flex align-items-center" to="/" onClick={cerrarMenu}>
            <img
              src="/IMAGENES/cropped-logo-cdn-2021.png"
              alt="Centros de Negocios Sercotec"
              style={{ 
                height: '45px', 
                objectFit: 'contain',
                marginRight: '12px'
              }}
            />
          </Link>

          {/* LADO DERECHO: El Botón que abre y esconde la lista */}
          <button 
            className="navbar-toggler" 
            type="button" 
            onClick={toggleMenu} // Controlamos el clic con React
            aria-expanded={menuAbierto}
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          {/* EL MENÚ DESPLEGABLE: Se muestra u oculta dinámicamente con la clase */}
          <div className={`collapse navbar-collapse justify-content-end ${menuAbierto ? 'show' : ''}`} id="menuVerticalDerecha">
            {/* Al hacer clic en cualquier Link, se ejecuta 'cerrarMenu' y la lista lo esconde */}
            <div className="navbar-nav d-flex flex-column align-items-end pt-3 pt-lg-0 w-100">
              <Link className="nav-link py-2 text-end" to="/" onClick={cerrarMenu}>Inicio</Link>
              <Link className="nav-link py-2 text-end" to="/nosotros" onClick={cerrarMenu}>Nosotros</Link>
              <Link className="nav-link py-2 text-end" to="/servicios" onClick={cerrarMenu}>Servicios</Link>
              <Link className="nav-link py-2 text-end" to="/contacto" onClick={cerrarMenu}>Contacto</Link>
            </div>
          </div>

        </div>
      </nav>

      {/* Sistema de Rutas Dinámicas */}
      <div className="container my-5">
        <Routes>
          <Route path="/" element={<Inicio />} />
          <Route path="/nosotros" element={<Nosotros />} />
          <Route path="/servicios" element={<Servicios />} />
          <Route path="/contacto" element={<Contacto />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;