import { useState, useEffect } from 'react';
import { Accordion, Spinner } from 'react-bootstrap';

export function Nosotros() {
  // -- MEMORIA DEL COMPONENTE ---

  // se crea un array vacío para guardar las preguntas frecuentes cuando lleguen del "servidor"
  const [faqs, setFaqs] = useState([]);
  
  // interruptor de carga. Empieza en true para mostrar el circulito de "pensando" al entrar a la página
  const [cargando, setCargando] = useState(true);

  // --- EFECTO PARA SIMULAR LA PETICIÓN A INTERNET ---
  useEffect(() => {
    //  función interna que simula una consulta a una base de datos externa
    // Funcion de API real ~ Si funciona voy a llorar:
  fetch('https://jsonplaceholder.typicode.com/posts?_limit=3') //<- API responde correctamente ~ trae texto en latin xd
    .then(res => res.json())
    .then(datos => {
    // Mapeamos los campos de la API a nuestro formato
      const faqsMapeadas = datos.map(item => ({
        id: String(item.id),
        pregunta: item.title,
        respuesta: item.body
    }));
    setFaqs(faqsMapeadas); //<- recibe el array transformado en FaqsMapeadas
    setCargando(false);
  });
  }, []); // Le dejo los corchetes vacíos para asegurarme de que esto corra una sola vez al cargar la página

  // --- LO QUE MUESTRA EN LA PANTALLA ---
  return (
    <div className="mx-auto" style={{ maxWidth: '800px' }}>
      {/* Sección fija: Información básica del departamento */}
      <div className="p-4 border rounded bg-white shadow-sm mb-5">
        <h2 className="fw-bold mb-3">Sobre el Departamento de Empleo</h2>
        <p className="text-secondary">Somos un organismo técnico de la Municipalidad de Providencia enfocado en modernizar el mercado laboral local.</p>
      </div>

      {/* Sección dinámica: Preguntas Frecuentes */}
      <div className="p-4 border rounded bg-white shadow-sm">
        <h2 className="mb-4 fw-bold">Preguntas Frecuentes (FAQ)</h2>
        
        {/* Hago un renderizado condicional inteligente: */}
        {cargando ? (
          // ESCENARIO A: Si sigue cargando, muestro la animación del spinner institucional
          <div className="text-center my-4">
            <Spinner animation="border" className="me-2" />
            <span className="text-muted">Consultando base de datos institucional...</span>
          </div>
        ) : (
          // ESCENARIO B: Si ya terminó de cargar, recorro la lista 
          <Accordion defaultActiveKey="0">
            {faqs.map((faq) => (
              <Accordion.Item eventKey={faq.id} key={faq.id}>
                {/* El Header muestra la pregunta y el Body la respuesta oculta */}
                <Accordion.Header>{faq.pregunta}</Accordion.Header>
                <Accordion.Body className="text-muted">{faq.respuesta}</Accordion.Body>
              </Accordion.Item>
            ))}
          </Accordion>
        )}
      </div>
    </div>
  );
}