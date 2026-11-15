# Movies IU Digital

Aplicación para administrar películas y series de la IU Digital de Antioquia, en modo administrador.

Proyecto Integrado II - Desarrollo de Aplicaciones Web. La EA1 es la API REST con Node.js; la EA2 es el frontend con React.

## Estructura

- `backend/`: API REST con Node.js, Express 5, MongoDB Atlas y Mongoose 9. Detalle en [backend/README.md](backend/README.md).
- `frontend/`: Vite, React 19, React Router, axios, Bootstrap 5 y SweetAlert2.

```
frontend/src/
├── App.jsx
├── main.jsx
├── index.css
├── components/
│   └── Navbar.jsx
├── pages/
│   ├── GenresPage.jsx
│   ├── DirectorsPage.jsx
│   ├── ProducersPage.jsx
│   ├── TypesPage.jsx
│   └── MediaPage.jsx
└── services/
    ├── api.js
    ├── genre.service.js
    ├── director.service.js
    ├── producer.service.js
    ├── type.service.js
    └── media.service.js
```

## Ejecutar en local

Necesitas dos terminales.

Backend:

```bash
cd backend
npm install
cp .env.example .env
```

Edita `backend/.env` y llena `MONGO_URI` con tu cadena de conexión de MongoDB Atlas. Luego:

```bash
npm run dev
```

La API queda en http://localhost:3000.

Frontend:

```bash
cd frontend
npm install
cp .env.example .env
npm run dev
```

El frontend queda en http://localhost:5173. Usa `VITE_API_URL` de `frontend/.env`, que por defecto es `http://localhost:3000/api`. Si el archivo no existe, `api.js` usa esa misma URL.

## Pantallas

- Géneros, Directores y Productoras: crear, listar, editar e inactivar (cambiando su estado a Inactivo).
- Tipos: crear, listar y editar. Los tipos no tienen estado.
- Media: crear, listar, editar y eliminar. Los selects de género, director y productora solo muestran los activos.

## Versión de la EA1

La etiqueta `ea1` conserva la API tal como se entregó en la EA1.

## Autores

- Juan Pablo Villa Álvarez
- Juan Manuel Arenas Rodríguez
