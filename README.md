# Shopping List App

Una aplicación de lista de compras full-stack con React (frontend) y Node.js + Express (backend) utilizando PostgreSQL como base de datos.

## 📋 Requisitos Previos

- **Node.js** v18+ ([descargar](https://nodejs.org/))
- **PostgreSQL** v15+ ([descargar](https://www.postgresql.org/download/))
- **npm** (incluido con Node.js)

## 🚀 Instalación y Configuración

### 1️⃣ Clonar o descargar el proyecto

```bash
cd c:\Users\MostachoteRex\Documents\shopping-list-app
```

### 2️⃣ Configurar Base de Datos PostgreSQL

#### Opción A: Usando psql (línea de comandos)

1. Abre PowerShell o CMD
2. Conecta a PostgreSQL:

```powershell
psql -U postgres
```

3. Crea la base de datos:

```sql
CREATE DATABASE shopping_list;
```

4. Sal de psql:

```sql
\q
```

5. Ejecuta el script de inicialización:

```powershell
cd .\backend\database
psql -U postgres -d shopping_list -f schema.sql
```

#### Opción B: Usando pgAdmin (interfaz gráfica)

1. Abre pgAdmin
2. Clic derecho en "Databases" → "Create" → "Database"
3. Nombre: `shopping_list`
4. Clic en "Create"
5. Abre Query Tool y ejecuta el contenido de `backend/database/schema.sql`

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

6. Inicia el servidor:

```powershell
npm start
```

✅ Backend ejecutándose en `http://localhost:3001`

### 4️⃣ Configurar Frontend

1. En una **nueva ventana de PowerShell/Terminal**, navega a frontend:

```powershell
cd .\frontend
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

```bash
curl -X PUT http://localhost:3001/api/items/1 \
  -H "Content-Type: application/json" \
  -d '{"comprado":true}'
```

**Eliminar un item:**

```bash
curl -X DELETE http://localhost:3001/api/items/1
```

## 📝 Variables de Entorno

### Backend (`.env`)

```env
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

## 🐛 Solución de Problemas

### Error: "Cannot find module 'axios'"

```powershell
cd frontend
npm install axios
```

### Error: "Database connection failed"

1. Verifica que PostgreSQL esté corriendo
2. Comprueba las credenciales en `.env`
3. Asegúrate de que la base de datos `shopping_list` existe

```powershell
psql -U postgres -l  # Listar todas las bases de datos
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
