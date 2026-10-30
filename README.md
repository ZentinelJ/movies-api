# Movies API

API REST para administrar películas y series de la IU Digital de Antioquia, en modo administrador.

Evidencia de Aprendizaje 1 del curso Proyecto Integrado II - Desarrollo de Aplicaciones Web.

## Tecnologías

- Node.js
- Express 5
- MongoDB Atlas
- Mongoose 9
- dotenv
- Postman

## Estructura

```
src/
├── app.js
├── config/
│   └── db.js
├── controllers/
│   ├── director.controller.js
│   ├── genre.controller.js
│   ├── media.controller.js
│   ├── producer.controller.js
│   └── type.controller.js
├── models/
│   ├── director.model.js
│   ├── genre.model.js
│   ├── media.model.js
│   ├── producer.model.js
│   └── type.model.js
└── routes/
    ├── director.routes.js
    ├── genre.routes.js
    ├── media.routes.js
    ├── producer.routes.js
    └── type.routes.js
```

```
postman/
└── movies-api.postman_collection.json
```

El proyecto sigue MVC. Como es una API, no hay vistas: las respuestas son JSON.

- `config/`: conexión a MongoDB (`db.js`).
- `models/`: esquemas de Mongoose, uno por colección.
- `controllers/`: lógica de cada operación y validación de reglas de negocio.
- `routes/`: define los endpoints y los conecta con su controlador.
- `postman/`: colección de Postman para probar la API.

## Instalación

```bash
git clone <URL del repositorio>
cd movies-api
npm install
```

Crea el archivo `.env` (ver la sección siguiente) y luego corre la API:

```bash
npm run dev
```

También puedes usar `npm start`, que no se reinicia al cambiar archivos.

Si todo está bien, la consola muestra `Conectado a MongoDB` y `Servidor en http://localhost:3000`. Para comprobarlo, abre `http://localhost:3000/`.

## Archivo `.env`

Copia el archivo de ejemplo:

```bash
cp .env.example .env
```

Luego reemplaza los valores con tus datos reales:

| Variable | Qué es | Ejemplo |
|---|---|---|
| `PORT` | Puerto donde escucha la API. Si no lo defines, usa 3000. | `3000` |
| `MONGO_URI` | Cadena de conexión de MongoDB Atlas (usuario, clave, cluster y base de datos). | `mongodb+srv://USUARIO:CLAVE@CLUSTER.mongodb.net/movies-db` |

Si `MONGO_URI` no es válida, la API se detiene y muestra el error de conexión.

El archivo `.env` nunca se sube a GitHub: está listado en `.gitignore`. Contiene la clave de tu base de datos, así que no lo compartas.

## Endpoints

La base de las rutas es `http://localhost:3000` (o el `PORT` que definas).

### Géneros: `/api/genres`

| Método | Ruta | Descripción |
|---|---|---|
| GET | `/api/genres` | Lista todos los géneros |
| GET | `/api/genres/:id` | Obtiene un género por id |
| POST | `/api/genres` | Crea un género |
| PUT | `/api/genres/:id` | Actualiza un género |

| Campo | Tipo | Obligatorio |
|---|---|---|
| `name` | String | Sí |
| `status` | `"Activo"` o `"Inactivo"` | No, por defecto `"Activo"` |
| `description` | String | No |

### Directores: `/api/directors`

| Método | Ruta | Descripción |
|---|---|---|
| GET | `/api/directors` | Lista todos los directores |
| GET | `/api/directors/:id` | Obtiene un director por id |
| POST | `/api/directors` | Crea un director |
| PUT | `/api/directors/:id` | Actualiza un director |

| Campo | Tipo | Obligatorio |
|---|---|---|
| `names` | String | Sí |
| `status` | `"Activo"` o `"Inactivo"` | No, por defecto `"Activo"` |

El campo se llama `names` (en plural), no `name`.

### Productoras: `/api/producers`

| Método | Ruta | Descripción |
|---|---|---|
| GET | `/api/producers` | Lista todas las productoras |
| GET | `/api/producers/:id` | Obtiene una productora por id |
| POST | `/api/producers` | Crea una productora |
| PUT | `/api/producers/:id` | Actualiza una productora |

| Campo | Tipo | Obligatorio |
|---|---|---|
| `name` | String | Sí |
| `status` | `"Activo"` o `"Inactivo"` | No, por defecto `"Activo"` |
| `slogan` | String | No |
| `description` | String | No |

### Tipos: `/api/types`

| Método | Ruta | Descripción |
|---|---|---|
| GET | `/api/types` | Lista todos los tipos |
| GET | `/api/types/:id` | Obtiene un tipo por id |
| POST | `/api/types` | Crea un tipo |
| PUT | `/api/types/:id` | Actualiza un tipo |

| Campo | Tipo | Obligatorio |
|---|---|---|
| `name` | String | Sí |
| `description` | String | No |

Los tipos no tienen `status`.

### Media: `/api/media`

| Método | Ruta | Descripción |
|---|---|---|
| GET | `/api/media` | Lista toda la media, con género, director, productora y tipo poblados |
| GET | `/api/media/:id` | Obtiene una media por id, con sus referencias pobladas |
| POST | `/api/media` | Crea una media |
| PUT | `/api/media/:id` | Actualiza una media |
| DELETE | `/api/media/:id` | Elimina una media |

| Campo | Tipo | Obligatorio |
|---|---|---|
| `serial` | String, único | Sí |
| `title` | String | Sí |
| `synopsis` | String | Sí |
| `url` | String, único | Sí |
| `coverImage` | String | Sí |
| `releaseYear` | Number | Sí |
| `genre` | ObjectId (id de un género) | Sí |
| `director` | ObjectId (id de un director) | Sí |
| `producer` | ObjectId (id de una productora) | Sí |
| `type` | ObjectId (id de un tipo) | Sí |

Ejemplo de cuerpo para `POST /api/media`. Reemplaza los ids por los `_id` reales de tus géneros, directores, productoras y tipos:

```json
{
  "serial": "MOV-0001",
  "title": "Ejemplo de película",
  "synopsis": "Sinopsis breve de la película.",
  "url": "https://example.com/peliculas/ejemplo",
  "coverImage": "https://example.com/portadas/ejemplo.jpg",
  "releaseYear": 2024,
  "genre": "665f1a2b3c4d5e6f7a8b9c01",
  "director": "665f1a2b3c4d5e6f7a8b9c02",
  "producer": "665f1a2b3c4d5e6f7a8b9c03",
  "type": "665f1a2b3c4d5e6f7a8b9c04"
}
```

## Reglas de negocio

- Una media solo acepta un género, un director y una productora que existan y estén en estado `Activo`. Si no, responde 400.
- El tipo (`type`) debe existir. Si no, responde 400.
- `serial` y `url` son únicos en media. Si se repiten, responde 409.
- Estas reglas aplican al crear y al actualizar media.
- Todos los modelos guardan `createdAt` y `updatedAt` automáticamente.

## Códigos de respuesta

| Código | Significado |
|---|---|
| 200 | Operación correcta (lectura, actualización o eliminación) |
| 201 | Recurso creado (POST) |
| 400 | Datos inválidos, id mal formado o referencia no válida |
| 404 | No existe un recurso con ese id |
| 409 | `serial` o `url` ya existen (solo en media) |
| 500 | Error inesperado del servidor |

## Probar con Postman

1. Importa `postman/movies-api.postman_collection.json` en Postman con el botón Import.
2. Deja la API corriendo con `npm run dev`.
3. Abre el Runner de la colección y corre las carpetas en orden: primero las de géneros, directores, productoras y tipos, y al final la de media, porque necesita que esos registros existan.

## Autores

- Juan Pablo Villa Álvarez
- Juan Manuel Arenas Rodríguez
