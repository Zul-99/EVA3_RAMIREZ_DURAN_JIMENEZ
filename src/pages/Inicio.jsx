import { TestimonialsCarousel } from '../components/organisms/TestimonialsCarousel';
import { Link } from 'react-router-dom';

export function Inicio() {
  // --- LO QUE SE VA A DIBUJAR EN LA PANTALLA PRINCIPAL ---
  return (
    <div>
      {/* 🌟 SECCIÓN BIENVENIDA: El contenedor principal con fondo blanco y sombras suaves */}
      <div className="text-center p-5 bg-white border rounded shadow-sm mb-5">
        
        {/* Título principal de la plataforma */}
        <h1 className="display-4 fw-bold">Proviemplea Digital</h1>
        
        {/* Bajada de título con estilo destacado (lead) para explicar de qué trata la web */}
        <p className="lead mt-3 text-muted">Innovando la intermediación laboral a través de un modelo de búsqueda inversa.</p>
        
        {/* Una línea horizontal sutil para separar el texto de los botones */}
        <hr className="my-4" />
        
        {/* Frase de cierre institucional */}
        <p className="text-secondary">Conectando empresas con el gran talento local de Providencia.</p>
        
        {/* 🔘 BOTONES DE ACCIÓN */}
        <div className="mt-4">
          {/* Este botón usa 'Link' de react-router-dom para viajar a la página de Servicios sin recargar el navegador */}
          {/* Nota: 'btn-success' ahora se pinta automáticamente en azul gracias a nuestro index.css */}
          <Link to="/servicios" className="btn btn-success btn-lg mx-2 fw-bold shadow-sm">Ver Servicios</Link>
          
          {/* Botón secundario con estilo de contorno para redirigir al formulario de contacto */}
          <Link to="/contacto" className="btn btn-outline-secondary btn-lg mx-2 fw-bold">Contáctanos</Link>
        </div>
      </div>

      {/*  Aquí incrusto el carrusel de testimonios que creé por separado */}
      <TestimonialsCarousel />
      
    </div>
  );
}