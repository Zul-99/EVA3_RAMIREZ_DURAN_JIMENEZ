import 'bootstrap/dist/css/bootstrap.min.css';
import { useState } from 'react'; // 1. Importamos useState para controlar el menú
import { BrowserRouter as Router, Routes, Route, Link, NavLink } from 'react-router-dom';
import { Inicio } from './pages/Inicio';
import { Nosotros } from './pages/Nosotros';
import { Servicios } from './pages/Servicios';
import { Contacto } from './pages/Contacto';
import { Footer } from './components/organisms/Footer'; // Importamos el componente Footer
import logo from './assets/cropped-logo-cdn-2021.png'; // Cambio de ruta de imagenes (seguimos las buenas practicas :D)


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
      <nav className="navbar navbar-expand-lg navbar-dark navbar-personalizada shadow" aria-label="Navegacion Principal">
        <div className="container">
          
          {/* LADO IZQUIERDO: Logo Corporativo */}
          <Link className="navbar-brand d-flex align-items-center" to="/" onClick={cerrarMenu}>
            <img
              src={logo}
              alt="Centros de Negocios Sercotec"
              style={{ height: '45px', objectFit: 'contain' }}
            />
          </Link>

          {/* LADO DERECHO: El Botón que abre y esconde la lista (solo visible en mobile) */}
          <button 
            className="navbar-toggler" 
            type="button" 
            onClick={toggleMenu}
            aria-expanded={menuAbierto}
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          {/* EL MENÚ: horizontal en desktop, desplegable en mobile */}
          {/* NavLink reemplaza a Link para poder resaltar el link de la página activa */}
          <div className={`collapse navbar-collapse justify-content-end ${menuAbierto ? 'show' : ''}`}>
            <ul className="navbar-nav gap-lg-2">
              <li className="nav-item">
                <NavLink
                  className={({ isActive }) => `nav-link ${isActive ? 'nav-link-activo' : ''}`}
                  to="/"
                  end
                  onClick={cerrarMenu}
                >
                  Inicio
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink
                  className={({ isActive }) => `nav-link ${isActive ? 'nav-link-activo' : ''}`}
                  to="/nosotros"
                  onClick={cerrarMenu}
                >
                  Nosotros
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink
                  className={({ isActive }) => `nav-link ${isActive ? 'nav-link-activo' : ''}`}
                  to="/servicios"
                  onClick={cerrarMenu}
                >
                  Servicios
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink
                  className={({ isActive }) => `nav-link ${isActive ? 'nav-link-activo' : ''}`}
                  to="/contacto"
                  onClick={cerrarMenu}
                >
                  Contacto
                </NavLink>
              </li>
            </ul>
          </div>

        </div>
      </nav>

      {/* Sistema de Rutas Dinámicas */}
      <div className="container my-5 contenido-principal">
        <Routes>
          <Route path="/" element={<Inicio />} />
          <Route path="/nosotros" element={<Nosotros />} />
          <Route path="/servicios" element={<Servicios />} />
          <Route path="/contacto" element={<Contacto />} />
        </Routes>
      </div>

      {/* Footer Institucional */}
      <Footer />
    </Router>
  );
}

export default App;