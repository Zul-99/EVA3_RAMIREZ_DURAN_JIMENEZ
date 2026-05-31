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
    const obtenerPreguntasFrecuentes = () => {
      // Promise para controlar el éxito de la operación asíncrona
      return new Promise((resolve) => {
        // Simulo un retraso de 1 segundo (1000ms) para emular la velocidad de internet
        setTimeout(() => {
          // Cuando pasa el segundo, "resuelvo" la promesa entregando mis datos simulados de Proviemplea
          resolve([
            { id: "0", pregunta: "¿Qué es el modelo de Búsqueda Inversa de Talento?", respuesta: "Permite a las empresas buscar perfiles idóneos de forma proactiva directamente en nuestra base de datos." },
            { id: "1", pregunta: "¿Cómo garantiza Proviemplea la inclusión laboral?", respuesta: "Nuestra plataforma anonimiza datos curriculares en las primeras fases para evitar sesgos inconscientes." },
            { id: "2", pregunta: "¿Tiene algún costo para las empresas?", respuesta: "No, todos los servicios de intermediación y asesoría técnica son totalmente gratuitos." }
          ]);
        }, 1000);
      });
    };

    // Se ejecuto la función. Cuando la promise se cumple (.then), se recibe los datos reales
    obtenerPreguntasFrecuentes().then((datos) => {
      setFaqs(datos);
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