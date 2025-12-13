# Shopping List App

Una aplicación de lista de compras full-stack con React (frontend) y Node.js + Express (backend) utilizando MongoDB como base de datos con Docker.

## 📋 Requisitos Previos

- **Node.js** v18+ ([descargar](https://nodejs.org/))
- **Docker** y **Docker Compose** ([descargar](https://www.docker.com/products/docker-desktop))
- **npm** (incluido con Node.js)

## 🚀 Instalación y Configuración

### 1️⃣ Clonar o descargar el proyecto

```bash
cd c:\Users\MostachoteRex\Documents\shopping-list-app
```

### 2️⃣ Iniciar MongoDB con Docker

1. Asegúrate de que Docker Desktop está ejecutándose
2. Desde la raíz del proyecto, inicia MongoDB:

```powershell
docker-compose up -d
```

3. Verifica que MongoDB esté corriendo:

```powershell
docker ps
```

Deberías ver un contenedor llamado `shopping-list-mongodb` en estado `Up`.

### 3️⃣ Configurar Backend

1. Navega a la carpeta backend:

```powershell
cd .\backend
```

2. Instala las dependencias:

```powershell
npm install
```

3. Crea el archivo `.env` en la carpeta `backend/`:

```powershell
cp .env.example .env
```

4. Verifica que el `.env` tenga los valores correctos (por defecto están listos):

```env
PORT=3001
DB_HOST=localhost
DB_PORT=5432
DB_NAME=shopping_list
DB_USER=postgres
DB_PASSWORD=password
FRONTEND_URL=http://localhost:3000
NODE_ENV=development
```

> **Nota:** Si tu contraseña de PostgreSQL es diferente, actualiza `DB_PASSWORD` en el `.env`

5. Compila TypeScript:

```powershell
npm run build
```

6. Inicia el servidor::

```env
PORT=3001
MONGODB_URI=mongodb://localhost:27017/shopping_list
FRONTEND_URL=http://localhost:3000
NODE_ENV=development
```

> **Nota:** La URI de MongoDB debe coincidir con el servicio en `docker-compose.yml
```

2. Instala las dependencias:

```powershell
npm install
```

3. Inicia el servidor de desarrollo:

```powershell
npm start
```

✅ Frontend ejecutándose en `http://localhost:3000`

## 📁 Estructura del Proyecto

```

## 🐳 Gestionar Docker

### Iniciar MongoDB
mongodb.ts           # Conexión a MongoDB
│   │   ├── models/
│   │   │   └── item.model.ts        # Schema de Mongoose
│   │   ├── controllers/
│   │   │   └── item.controller.ts   # Lógica HTTP
│   │   ├── services/
│   │   │   └── item.service.ts      # Lógica de negocio
│   │   ├── routes/
│   │   │   └── item.routes.ts       # Rutas API
│   │   └── index.ts                 # Punto de entrada
│   ├── database/
│   │   └── schema.sql               # Script anterior (PostgreSQL - deprecado)
│   ├── .env.example                 # Variables de entorno ejemplo
│   ├── package.json
│   ├── tsconfig.json
│   └── docker-compose.yml           # Configuración MongoDBf mongodb
```

### Conectar a MongoDB directamente

```powershell
docker exec -it shopping-list-mongodb mongosh
```
shopping-list-app/
├── backend/
│   ├── src/
│   │   ├── config/
│   │   │   └── database.ts          # Conexión a PostgreSQL
│   │   ├── models/
│   │   │   └── item.model.ts        # Interfaces de tipos
│   │   ├── controllers/
│   │   │   └── item.controller.ts   # Lógica HTTP
│   │   ├── services/
│   │   │   └── item.services.ts     # Lógica de negocio
│   │   ├── routes/
│   │   │   └── item.routes.ts       # Rutas API
│   │   └── index.ts                 # Punto de entrada
│   ├── database/
│   │   └── schema.sql               # Script de inicialización DB
│   ├── .env.example                 # Variables de entorno ejemplo
│   ├── package.json
│   └── tsconfig.json
│
├── frontend/
│   ├── src/
│   │   ├── context/
│   │   │   └── ItemContext.tsx      # Estado global (React Context)
│   │   ├── services/
│   │   │   └── api.ts              # Cliente HTTP (axios)
│   │   ├── types/
│   │   │   └── item.ts             # Tipos TypeScript
│   │   ├── components/
│   │   │   └── ...                 # Componentes React
│   │   ├── App.tsx
│   │   └── index.tsx
│   ├── public/
│   └── package.json
│
└── README.md
```

## 🔌 API Endpoints

### Base URL: `http://localhost:3001/api`

| Método | Endpoint | Descripción |
|--------|----------|-------------|
| `GET` | `/items` | Obtener todos los items |
| `POST` | `/items` | Crear nuevo item |
| `PATCH` | `/items/:id/toggle` | Marcar/desmarcar como comprado |
| `PUT` | `/items/:id` | Actualizar item |
| `DELETE` | `/items/:id` | Eliminar item |

### Ejemplo de uso

**Obtener todos los items:**

```bash
curl http://localhost:3001/api/items
```

**Crear un item:**

```bash
curl -X POST http://localhost:3001/api/items \
  -H "Content-Type: application/json" \
  -d '{"nombre":"Manzanas","cantidad":5}'
```

**Actualizar un item:**

```bash507f1f77bcf86cd799439011 \
  -H "Content-Type: application/json" \
  -d '{"comprado":true}'
```

**Marcar como comprado/pendiente:**

```bash
curl -X PATCH http://localhost:3001/api/items/507f1f77bcf86cd799439011/toggle \
  -H "Content-Type: application/json"
```

**Eliminar un item:**

```bash
curl -X DELETE http://localhost:3001/api/items/507f1f77bcf86cd79943901
curl -X DELETE http://localhost:3001           # Puerto del servidor
MONGODB_URI=mongodb://localhost:27017/shopping_list  # URI de MongoDB
FRONTEND_URL=http://localhost:3000             # URL del frontend (CORS)
NODE_ENV=development           
PORT=3001                           # Puerto del servidor
DB_HOST=localhost                   # Host de PostgreSQL
DB_PORT=5432                        # Puerto de PostgreSQL
DB_NAME=shopping_list               # Nombre de la base de datos
DB_USER=postgres                    # Usuario de PostgreSQL
DB_PASSWORD=password                # Contraseña de PostgreSQL
FRONTEND_URL=http://localhost:3000  # URL del frontend (CORS)
NODE_ENV=development                # Ambiente: development | production
```

### Frontend (`.env` - opcional)

Puedes crear un `.env` en frontend para configurar:

```env
REACT_APP_API_URL=http://localhost:3001/api
```

## 🛠️ Scripts Disponibles

### Backend

```powershell
npm start       # Ejecutar servidor en desarrollo
npm run build   # Compilar TypeScript
npm run dev     # Ejecutar con nodemon (watch mode)
npm test        # Ejecutar pruebas
```

### Frontend

```powershell
npm start       # Ejecutar servidor de desarrollo
npm run build   # Compilar para producción
npm test        # Ejecutar pruebas
npm run eject   # Ejecer configuración (irreversible)
```
MongoDB connection failed"

1. Verifica que Docker está ejecutándose
2. Asegúrate de que MongoDB está iniciado:

```powershell
docker-compose up -d
```

3. Comprueba los logs:

```powershell
docker-compose logs mongodb
```

### Error: "Cannot find module 'mongoose'"

```powershell
cd backend
npm install
```

### Error: "Port 3001 already in use"

Cambia el puerto en `backend/.env`:

```env
PORT=3002
```

### Error: "Port 3000 already in use"

Mata el proceso o usa un puerto diferente:

```powershell
# Encontrar proceso en puerto 3000
Get-NetTCPConnection -LocalPort 3000

# Matar proceso (reemplazar PID)
Stop-Process -Id <PID> -Force
```

### Limpiar datos de MongoDB

```powershell
docker-compose down -v
docker-compose up -d
```
mongoose** - ODM para MongoDB
> ⚠️ **Nota:** Esto eliminará todos los datos almacenados en MongoDB
# Matar proceso (reemplazar PID)
Stop-Process -Id <PID> -Force
```

## 📦 Dependencias Principales

### Backend
- **express** - Framework web
- **pg** - Cliente PostgreSQL
- **typescript** - Lenguaje tipado
- **cors** - Control de origen cruzado
- **dotenv** - Variables de entorno

### Frontend
- **react** - Librería UI
- **react-dom** - DOM de React
- **axios** - Cliente HTTP
- **typescript** - Lenguaje tipado
- **react-scripts** - Build tools
