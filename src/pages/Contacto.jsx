import { useForm } from 'react-hook-form';
import { useLocation } from 'react-router-dom';
import { Form, Button, Alert } from 'react-bootstrap';
import { useState, useEffect } from 'react';

export function Contacto() {
  // ---  ESTADOS DE MI FORMULARIO ---

  // Inicializo 'useLocation' para poder atrapar los datos (el servicio seleccionado) que me mandaron desde la tarjeta anterior
  const location = useLocation();
  
  // Se crea un estado para controlar si el formulario ya fue enviado con éxito y mostrar un mensaje de alerta
  const [enviado, setEnviado] = useState(false);
  
  // Intento rescatar el nombre del servicio enviado en el "state". Si no viene ninguno, lo dejo como un texto vacío ""
  const servicioPrevio = location.state?.servicioSeleccionado || "";
  
  // Desestructuro las herramientas esenciales de 'react-hook-form' para registrar inputs, manejar el envío y capturar errores de validación
  const { register, handleSubmit, setValue, formState: { errors } } = useForm();

  // --- EFECTO PARA PRE-LLENAR EL FORMULARIO ---
  useEffect(() => {
    // Si efectivamente el usuario viene redirigido desde una tarjeta de servicio, inyecto automáticamente ese valor en el input 'servicio'
    if (servicioPrevio) setValue('servicio', servicioPrevio);
  }, [servicioPrevio, setValue]); // El efecto se ejecuta si cambia el servicio previo o la función setValue

  // --- FUNCIÓN AL ENVIAR LOS DATOS ---
  const onSubmit = (data) => { 
    // Cuando el formulario pasa todas las validaciones, cambio mi estado a true para activar la alerta verde de éxito
    setEnviado(true); 
  };

  // --- DISEÑO DE LA PANTALLA ---
  return (
    <div className="mx-auto" style={{ maxWidth: '600px' }}>
      <div className="mb-4">
        <h2 className="fw-bold">Formulario de Contacto</h2>
      </div>

      {/*  Si 'enviado' es true, Bootstrap dibuja una alerta flotante de éxito */}
      {enviado && (
        <Alert variant="success" onClose={() => setEnviado(false)} dismissible>
          ¡Formulario enviado con éxito!
        </Alert>
      )}

      {/* Contenedor estilizado con las clases personalizadas de mi index.css */}
      <div className="formulario-contenedor">
        <Form onSubmit={handleSubmit(onSubmit)}>
          
          {/* Campo: Empresa o Representante */}
          <Form.Group className="mb-3">
            <Form.Label className="fw-bold text-secondary">Empresa / Representante</Form.Label>
            {/* Registro el input con react-hook-form y le indico que es obligatorio.  */}
            <input 
              type="text" 
              className={`form-control ${errors.nombre ? 'is-invalid' : ''}`} 
              {...register('nombre', { required: 'Obligatorio' })} 
            />
          </Form.Group>

          {/* Campo: Correo Electrónico */}
          <Form.Group className="mb-3">
            <Form.Label className="fw-bold text-secondary">Correo Electrónico</Form.Label>
            <input 
              type="email" 
              className={`form-control ${errors.email ? 'is-invalid' : ''}`} 
              {...register('email', { required: 'Obligatorio' })} 
            />
          </Form.Group>

          {/* Campo: Servicio de Interés (Este campo se auto-completa) */}
          <Form.Group className="mb-3">
            <Form.Label className="fw-bold text-secondary">Servicio de Interés</Form.Label>
            {/* Le coloco 'readOnly' y fondo gris para que el usuario vea el servicio seleccionado sin poder modificarlo a la fuerza */}
            <input 
              type="text" 
              className="form-control bg-light" 
              readOnly 
              {...register('servicio')} 
            />
          </Form.Group>

          {/* Campo: Mensaje o Comentarios */}
          <Form.Group className="mb-4">
            <Form.Label className="fw-bold text-secondary">Mensaje</Form.Label>
            <textarea 
              className={`form-control ${errors.mensaje ? 'is-invalid' : ''}`} 
              rows="4" 
              {...register('mensaje', { required: 'Obligatorio' })}
            ></textarea>
          </Form.Group>

          {/* Botón de Envío: Al hacer clic, el disparador 'handleSubmit' que valida todo antes de llamar a 'onSubmit' */}
          <Button type="submit" className="w-100 btn-gradiente py-2">
            Enviar Solicitud Segura
          </Button>
        </Form>
      </div>
    </div>
  );
}