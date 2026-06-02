# Sercotec — Centro de Negocios
### Evaluación N°3 — Desarrollo Frontend con React

**Demo en vivo:** [eva-3-ramirez-duran-jimenez.vercel.app](https://eva-3-ramirez-duran-jimenez.vercel.app/)

**Integrantes:**
- Luisa Ramírez
- Drayer Durán
- Felipe Jiménez

---

## ¿Qué es este proyecto?

Es una aplicación web institucional que simula el sitio del **Centro de Negocios Sercotec**, construida con React + Vite. Incluye navegación entre páginas, un formulario de contacto con validaciones, tarjetas de servicios, y un carrusel de testimonios.

---

## Tecnologías utilizadas

| Tecnología | Para qué se usa |
|---|---|
| **React 19** | Librería principal para construir la interfaz |
| **Vite 8** | Herramienta que compila y sirve el proyecto (mucho más rápida que CRA) |
| **React Router DOM** | Permite navegar entre páginas sin recargar el sitio |
| **Bootstrap 5 + React Bootstrap** | Componentes visuales y sistema de grilla responsiva |
| **React Hook Form** | Manejo y validación del formulario de contacto |
| **JSONPlaceholder** | API de prueba gratuita para consumo de datos simulados |
| **Vercel** | Plataforma donde está desplegada la aplicación |

---

## Estructura del Proyecto

```
src/
├── assets/              # Imágenes internas (logo, etc.)
├── components/
│   ├── atoms/           # Componentes mínimos (botones, íconos)
│   ├── molecules/       # Componentes medios (ServiceCard)
│   ├── organisms/       # Componentes grandes (Footer, TestimonialsCarousel)
│   └── js_components/   # Lógica pura de JavaScript (validaciones, envío)
├── pages/               # Páginas completas (Inicio, Nosotros, Servicios, Contacto)
├── App.jsx              # Componente raíz con el Navbar y el sistema de rutas
├── App.css              # Estilos personalizados de la app
├── index.css            # Estilos globales y variables de Sercotec
└── main.jsx             # Punto de entrada de React
```

> **¿Por qué esta estructura?** Separa las responsabilidades. Cada carpeta tiene un propósito claro: las `pages` son lo que el usuario ve como "pantalla", los `organisms` son bloques grandes reutilizables, y los `js_components` contienen solo lógica sin nada visual. Esto hace el código más fácil de mantener.

---

## Buenas Prácticas Aplicadas

### 1. Componentes con Responsabilidad Única

Cada componente hace una sola cosa. `ServiceCard` solo muestra una tarjeta, `Footer` solo muestra el pie de página. Si hay que cambiar algo, sabes exactamente dónde ir.

```jsx
// ServiceCard.jsx — solo se encarga de mostrar UNA tarjeta
export function ServiceCard({ titulo, descripcion, imagen }) {
  return (
    <Card>
      <Card.Img src={imagen} />
      <Card.Body>
        <Card.Title>{titulo}</Card.Title>
        <Card.Text>{descripcion}</Card.Text>
      </Card.Body>
    </Card>
  );
}
```

---

### 2. useState para Controlar el Estado

`useState` es el hook de React que permite que un componente "recuerde" información y se actualice visualmente cuando esa información cambia.

```jsx
// En App.jsx — controla si el menú mobile está abierto o cerrado
const [menuAbierto, setMenuAbierto] = useState(false);

const toggleMenu = () => {
  setMenuAbierto(!menuAbierto); // Invierte el estado actual
};
```

> **Regla de oro:** Si una variable necesita que la pantalla se actualice cuando cambia → usa `useState`. Si no, usa una variable normal.

---

### 3. useEffect para Efectos Secundarios

`useEffect` ejecuta código **después** de que el componente se dibuja. Se usa para cosas que no son parte del renderizado en sí, como cargar datos, suscribirse a eventos, o en este caso, pre-llenar un campo de formulario.

```jsx
// En Contacto.jsx — pre-llena el campo "servicio" si el usuario viene desde una tarjeta
useEffect(() => {
  if (servicioPrevio) setValue('servicio', servicioPrevio);
}, [servicioPrevio, setValue]); // Solo se ejecuta si estos valores cambian
```

> **El array del final `[]` es clave:** Si está vacío, el efecto corre solo una vez al cargar. Si tiene variables dentro, corre cada vez que esas variables cambian. Si no se pone, corre en cada renderizado (¡peligroso!).

---

### 4. Props para Comunicar Componentes (Padre → Hijo)

Las `props` son la forma de pasar datos de un componente padre a uno hijo. Funcionan como los parámetros de una función.

```jsx
// Servicios.jsx (PADRE) — pasa los datos a cada tarjeta
listaServicios.map((s) => (
  <ServiceCard 
    titulo={s.titulo}        // prop: titulo
    descripcion={s.descripcion} // prop: descripcion
    imagen={s.imagen}        // prop: imagen
  />
))

// ServiceCard.jsx (HIJO) — recibe y usa los datos
export function ServiceCard({ titulo, descripcion, imagen }) {
  // Ahora puede usar titulo, descripcion e imagen
}
```

---

### 5. .map() para Renderizar Listas

En lugar de copiar y pegar el mismo bloque JSX para cada elemento, usamos `.map()` para generar los elementos dinámicamente desde un array de datos.

```jsx
// TestimonialsCarousel.jsx — genera las diapositivas automáticamente
{testimonios.map((t) => (
  <Carousel.Item key={t.id}>  {/* key es obligatorio — le dice a React qué elemento es cuál */}
    <p>"{t.comentario}"</p>
    <h5>{t.empresa}</h5>
  </Carousel.Item>
))}
```

> **Siempre usa `key`** al hacer `.map()`. Sin él, React no puede identificar cuál elemento cambió y actualiza toda la lista de nuevo (ineficiente y puede causar bugs).

---

### 6. NavLink para el Menú Activo

`NavLink` es como `Link` pero además detecta si la ruta actual coincide con su destino, y si coincide le aplica una clase CSS automáticamente. Así el link de la página activa se resalta sin escribir lógica extra.

```jsx
<NavLink
  className={({ isActive }) => `nav-link ${isActive ? 'nav-link-activo' : ''}`}
  to="/servicios"
>
  Servicios
</NavLink>
```

---

### 7. Separación de Lógica y Vista

Las funciones de validación y el envío del formulario viven en `js_components/contacto.js`, completamente separados del JSX. El componente `Contacto.jsx` solo importa esas funciones y las usa.

```js
// contacto.js — lógica pura, sin JSX
export const ValidarCorreo = (email) => { /* ... validaciones ... */ };
export const ValidarNombre = (nombre) => { /* ... validaciones ... */ };
export function FormularioSend(nombre, email, servicio, mensaje) {
  console.log("Formulario enviado:", { nombre, email, servicio, mensaje });
}
```

```jsx
// Contacto.jsx — solo importa y usa
import { ValidarCorreo, ValidarNombre, FormularioSend } from '../components/js_components/contacto';
```

> Esto se llama **separación de responsabilidades**. Si mañana quieres cambiar la validación del correo, solo tocas `contacto.js` sin riesgo de romper el diseño.

---

### 8. React Hook Form para Formularios

En lugar de manejar cada campo con un `useState` por separado (lo que se vuelve caótico), `react-hook-form` centraliza todo el control del formulario con un solo hook.

```jsx
const { register, handleSubmit, setValue, formState: { errors } } = useForm();

// Registrar un campo — solo se agrega {...register('nombre', { required: 'Obligatorio' })}
<FormControl {...register('nombre', { 
  required: 'Obligatorio',
  validate: ValidarNombre  // función de validación personalizada
})} />

// Mostrar el error si existe
{errors.nombre && <p>{errors.nombre.message}</p>}
```

---

### 9. Consumo de API Externa con JSONPlaceholder

Para practicar el consumo de APIs REST en proyectos frontend, se puede usar **JSONPlaceholder**, una API pública y gratuita que retorna datos JSON falsos pero con estructura real.

 **https://jsonplaceholder.typicode.com**

Ejemplo de uso con `fetch`:

```js
// Obtener una lista de usuarios
fetch('https://jsonplaceholder.typicode.com/users')
  .then(response => response.json())
  .then(data => console.log(data));
```

Endpoints disponibles:

| Endpoint | Descripción |
|---|---|
| `/posts` | 100 publicaciones de blog |
| `/users` | 10 usuarios con nombre, email, dirección |
| `/comments` | 500 comentarios |
| `/todos` | 200 tareas con estado completado/pendiente |
| `/photos` | 5000 fotos con URL de imagen |

>  En un proyecto real, esta URL se reemplaza por la API real del backend. Usar JSONPlaceholder durante el desarrollo permite construir y probar el frontend sin necesitar el backend listo.

---

### 10. Imágenes en `public/` vs `src/assets/`

| Ubicación | Cuándo usarla |
|---|---|
| `public/` | Imágenes que necesitan una URL fija (ej: `/gob_turismo_economia.png`) |
| `src/assets/` | Imágenes que se importan directamente en el código con `import logo from './assets/logo.png'` |

```jsx
//Buena práctica — imagen de assets importada correctamente
import logo from './assets/cropped-logo-cdn-2021.png';
<img src={logo} alt="Logo Sercotec" />

//Buena práctica — imagen de public accedida por ruta absoluta
<img src="/gob_turismo_economia.png" alt="Ministerio de Economía" />
```

---

## Cómo correr el proyecto localmente

```bash
# 1. Clonar el repositorio
git clone https://github.com/Zul-99/EVA3_RAMIREZ_DURAN_JIMENEZ.git

# 2. Entrar a la carpeta
cd EVA3_RAMIREZ_DURAN_JIMENEZ

# 3. Instalar dependencias
npm install

# 4. Iniciar el servidor de desarrollo
npm run dev
```

El proyecto queda disponible en `http://localhost:5173`

---

## Scripts disponibles

| Comando | Qué hace |
|---|---|
| `npm run dev` | Inicia el servidor de desarrollo |
| `npm run build` | Compila el proyecto para producción |
| `npm run preview` | Previsualiza la versión compilada localmente |
| `npm run lint` | Revisa el código con ESLint |

---

*Evaluación N°3 — Instituto Profesional San Sebastián*
