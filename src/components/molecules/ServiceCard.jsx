import { Button, Card } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

// --- MI COMPONENTE REUTILIZABLE ---
// Se usa la desestructuración para recibir "props" (titulo, descripcion, imagen).
// Esto me permite usar esta misma tarjeta muchas veces con datos distintos.
export function ServiceCard({ titulo, descripcion, imagen }) {
  
  // Inicializo el hook de navegación para poder mover al usuario de página mediante código
  const navigate = useNavigate();

  // --- FUNCIÓN PARA EL CLIC DEL BOTÓN ---
  const handleContactoClick = () => {
    // Redirijo al usuario a la página de contacto, pero además uso "state" para 
    // enviarle en secreto el nombre del servicio que le interesó.
    navigate('/contacto', { state: { servicioSeleccionado: titulo } });
  };

  // --- ESTRUCTURA VISUAL DE LA TARJETA ---
  return (
    // 'h-100' hace que todas las tarjetas midan lo mismo, y 'tarjeta-premium' aplica mis estilos de index.css
    <Card className="h-100 tarjeta-premium">
      
      {/* Imagen de la tarjeta */}
      <Card.Img 
        variant="top" 
        src={imagen || "https://via.placeholder.com/300x180"} 
        style={{ objectFit: 'cover', height: '180px' }}
      />
      
      {/* Cuerpo de la tarjeta organizado con Flexbox vertical */}
      <Card.Body className="d-flex flex-column">
        
        {/* Despliego dinámicamente el título del servicio */}
        <Card.Title className="fw-bold">{titulo}</Card.Title>
        
        {/* Se muestra  la descripción. 'flex-grow-1' estira el texto para que los botones queden perfectamente alineados abajo */}
        <Card.Text className="text-secondary small flex-grow-1">
          {descripcion}
        </Card.Text>
        
        {/* Botón de acción: al hacerle clic ejecuta la función de redirección con datos */}
        <Button className="mt-3 w-100 btn-gradiente" onClick={handleContactoClick}>
          Contáctanos
        </Button>
        
      </Card.Body>
    </Card>
  );
}