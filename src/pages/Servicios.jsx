import { Row, Col } from 'react-bootstrap';
import { ServiceCard } from '../components/molecules/ServiceCard';

export function Servicios() {
  // --- LISTA DE SERVICIOS OFRECIDOS ---
  // Se define un array de objetos donde cada uno representa un servicio con su título, descripción y una imagen real de Unsplash
  const listaServicios = [
    { id: 1, titulo: "Búsqueda Inversa de Talento", descripcion: "Busca proactivamente perfiles locales idóneos en una base de datos transparente y sin sesgos.", imagen: "https://static.wixstatic.com/media/b3c574_e1a1488200724306bfebb95ddc2c3d0d~mv2.png/v1/fill/w_921,h_460,al_c,q_90/b3c574_e1a1488200724306bfebb95ddc2c3d0d~mv2.png=500" },
    { id: 2, titulo: "Programa de Inclusión Laboral", descripcion: "Asesoría especializada para empresas en la incorporación de talentos diversos de manera equitativa.", imagen: "https://images.unsplash.com/photo-1531538606174-0f90ff5dce83?w=500" },
    { id: 3, titulo: "Vinculación y Networking", descripcion: "Espacios de articulación entre organizaciones públicas y privadas para potenciar el desarrollo local.", imagen: "https://images.unsplash.com/photo-1515187029135-18ee286d815b?w=500" }
  ];

  // --- DISEÑO DE SERVICIOS ---
  return (
    <div className="container">
      {/* El encabezado simple de la sección */}
      <div className="mb-5">
        <h2 className="fw-bold">Nuestros Servicios Especializados</h2>
      </div>

      {/* RESPONSIVA DE BOOTSTRAP */}
      {/* 'xs={1}' significa: en pantallas de celular muestra 1 tarjeta por fila */}
      {/* 'md={3}' significa: en pantallas medianas/grandes muestra 3 tarjetas por fila */}
      {/* 'g-4' es el 'gap', el espacio de separación que dejamos entre cada tarjeta */}
      <Row xs={1} md={3} className="g-4">
        
        {/* RECORRIENDO E INYECTANDO LAS TARJETAS REUTILIZABLES */}
        
        {/* Uso un .map() para iterar mi 'listaServicios' y por cada elemento creo una columna autónoma */}
        {listaServicios.map((s) => (
          // Le paso el 'id' único a la columna para que React mantenga el orden del DOM de forma eficiente
          <Col key={s.id}>
            {/* Invoco mi componente 'ServiceCard' y le traspaso los datos específicos mediante sus props */}
            <ServiceCard 
              titulo={s.titulo} 
              descripcion={s.descripcion} 
              imagen={s.imagen} 
            />
          </Col>
        ))}
        
      </Row>
    </div>
  );
}