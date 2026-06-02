import { Carousel } from 'react-bootstrap';

export function TestimonialsCarousel() {
  // --- DATOS SIMULADOS (ARRAY DE OBJETOS) ---
  // Aquí  se guarda toda la información de los testimonios. Cada empresa es un objeto con sus propios datos y colores.
  const testimonios = [
    {
      id: 1,
      empresa: "Tecnologías Globales S.A.",
      rol: "Gerente de Recursos Humanos",
      comentario: "La plataforma de búsqueda inversa cambió radicalmente cómo reclutamos. Ahora encontramos talento inclusivo en Providencia de forma rápida, transparente y sin sesgos curriculares.",
      stylePersonalizado: { backgroundColor: '#4572caff', color: '#ffffff' } // Tono azul corporativo 1
    },
    {
      id: 2,
      empresa: "Logística del Cono Sur",
      rol: "Jefa de Atracción de Talento",
      comentario: "Excelente iniciativa del Departamento de Empleo. El acompañamiento y el acceso directo a perfiles idóneos optimizó nuestros procesos manuales que antes tardaban semanas en planillas Excel.",
      stylePersonalizado: { backgroundColor: '#4277c0ff', color: '#ffffff' } // Tono azul corporativo 2
    },
    {
      id: 3,
      empresa: "Estudio de Diseño Creativo",
      rol: "Director General",
      comentario: "Poder buscar proactivamente el talento local con la seguridad y el respaldo de la Municipalidad ha sido un beneficio tremendo para nuestra competitividad.",
      stylePersonalizado: { backgroundColor: '#3f60c6ff', color: '#ffffff' } // Tono azul corporativo 3
    }
  ];

  // --- RENDEREADO DEL COMPONENTE ---
  return (
    <div className="my-5">
      {/* Título de la sección con la clase especial para heredar los estilos de Sercotec */}
      <div className="mb-4 text-center">
        <h3 className="fw-bold text-primary-sercotec w-100">Lo que dicen las Empresas Aliadas</h3>
      </div>

      {/*EL CARRUSEL DE BOOTSTRAP: Configuro los indicadores de bolitas, las flechas y el tiempo de cambio (5 segundos) */}
      <Carousel id="testimonios-carousel" aria-label="Testimonios de empresas aliadas" indicators={true} controls={true} interval={5000} className="shadow rounded overflow-hidden">
        
        {/* USANDO .MAP PARA GENERAR LAS DIAPOSITIVAS DINÁMICAMENTE */}
        {/* Recorro mi array de 'testimonios' y por cada uno genero un bloque de diapositiva (Carousel.Item) */}
        {testimonios.map((t) => (
          <Carousel.Item key={t.id}>
            
            {/* Contenedor de la diapositiva: Centrado con Flexbox y aplicando el color de fondo personalizado de cada objeto */}
            <div 
              className="d-flex flex-column justify-content-center align-items-center p-5" 
              style={{ ...t.stylePersonalizado, minHeight: '250px' }}
            >
              <div className="container text-center px-md-5">
                {/* Imprime el comentario en cursiva */}
                <p className="fs-5 italic mb-3">"{t.comentario}"</p>
                
                {/* Muestra el nombre de la empresa usando el color celeste brillante oficial */}
                <h5 className="fw-bold mb-0" style={{ color: '#00aeef' }}>{t.empresa}</h5>
                
                {/* Muestra el rol o cargo de la persona con una opacidad suave */}
                <small className="opacity-75">{t.rol}</small>
              </div>
            </div>
            
          </Carousel.Item>
        ))}
        
      </Carousel>
    </div>
  );
}