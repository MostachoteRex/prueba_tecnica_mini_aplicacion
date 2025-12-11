# 🛒 Shopping List App - Aplicación Full-stack

Aplicación Full-stack para gestionar una lista de compras con backend en Node.js/Express/TypeScript, frontend en React/TypeScript y PostgreSQL como base de datos.

# 🚀 Instalación

Opción 1: Con Docker
1. Clonar el repositorio

       git clone https://github.com/tu-usuario/shopping-list-app.git
       cd shopping-list-app

2. Ejecutar con Docker Compose

       docker-compose up -d

3. Acceder a:
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:3001

Opción 2: Sin Docker (Desarrollo Local)
- Requisitos: Node.js 18+, PostgreSQL 15+
1. Configurar PostgreSQL

       createdb shopping_list
       psql -U postgres -d shopping_list -f backend/database/schema.sql
2. Backend (Terminal 1)

       cd backend
       npm install
       cp .env.example .env  # Editar si es necesario
       npm run dev
# 📁 Estructura del Proyecto
text
shopping-list-app/

├── backend/          # API REST (Node.js + Express + TypeScript)

├── frontend/         # Aplicación React + TypeScript

├── docker-compose.yml

└── README.md

# 🔧 Configuración de Base de Datos
PostgreSQL Setup

Crear base de datos

    createdb shopping_list

Crear tabla (ejecutar en psql o usar el archivo)
    
    psql -U postgres -d shopping_list -f backend/database/schema.sql

Schema SQL:

    CREATE TABLE items_compra (
      id SERIAL PRIMARY KEY,
      nombre VARCHAR(255) NOT NULL,
      cantidad INTEGER DEFAULT 1,
      comprado BOOLEAN DEFAULT FALSE,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );

# 🚦 Ejecutar la Aplicación
- Backend (Node.js API)

      cd backend
      npm install
      npm run dev
      # API disponible en: http://localhost:3001

- Frontend (React App)

      cd frontend
      npm install
      npm start
      # App disponible en: http://localhost:3000

#📡 Endpoints API
- GET /api/items - Obtener todos los items
- POST /api/items - Crear nuevo item
- PUT /api/items/:id - Actualizar item
- DELETE /api/items/:id - Eliminar item

Ejemplo:


      curl -X POST http://localhost:3001/api/items \
        -H "Content-Type: application/json" \
        -d '{"nombre": "Manzanas", "cantidad": 5}'

# 🐳 Comandos Docker


      # Iniciar todo
      docker-compose up -d

      # Ver logs
      docker-compose logs -f

      # Detener
      docker-compose down

      # Reconstruir
      docker-compose up -d --build

# 🔗 Variables de Entorno
Backend (.env)

      PORT=3001
      DB_HOST=localhost
      DB_PORT=5432
      DB_NAME=shopping_list
      DB_USER=postgres
      DB_PASSWORD=tu_password
      FRONTEND_URL=http://localhost:3000

Frontend (.env)

      REACT_APP_API_URL=http://localhost:3001/api

# 🖥️ Funcionalidades
✅ Ver lista de items

✅ Agregar nuevos items

✅ Marcar como comprado

✅ Eliminar items

✅ Diseño responsive

✅ TypeScript en frontend y backend
