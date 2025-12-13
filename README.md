# 🛒 Shopping List App

Aplicación **full-stack** de lista de compras desarrollada con:

- **Frontend:** React + TypeScript  
- **Backend:** Node.js + Express + TypeScript  
- **Base de datos:** MongoDB  
- **Infraestructura:** Docker & Docker Compose  

---

## 🚀 Ejecutar el proyecto con Docker

### 1️⃣ Clonar el repositorio (o una rama específica)

```bash
git clone -b mongo https://github.com/MostachoteRex/prueba_tecnica_mini_aplicacion
cd shopping-list-app
```

### 2️⃣ Levantar todos los servicios con Docker

```bash
docker-compose up -d
```

Esto iniciará automáticamente:
- MongoDB
- Backend
- Frontend

### 3️⃣ Acceder a la aplicación

- **Frontend:** http://localhost:3000  
- **Backend:** http://localhost:3001/api/items  
  
✔ No necesitas MongoDB local  

---

## 🧰 Requisitos

- Docker
- Docker Compose

---

## 📁 Estructura del Proyecto

```
shopping-list-app/
├── docker-compose.yml
├── backend/
│   ├── src/
│   ├── Dockerfile
│   ├── .env.example
│   └── package.json
├── frontend/
│   ├── src/
│   ├── Dockerfile
│   └── package.json
└── README.md
```

---

## 🔌 API Endpoints

**Base URL:** `http://localhost:3001/api/items`

| Método | Endpoint |
|------|--------|
| GET | /items |
| POST | /items |
| PATCH | /items/:id/toggle |
| PUT | /items/:id |
| DELETE | /items/:id |

---

## 🐳 MongoDB (opcional)

```bash
docker exec -it shopping-list-mongodb mongosh
```

Base de datos:
```
shopping_list
```

---

## 🧹 Limpiar datos

```bash
docker-compose down -v
docker-compose up -d
```

---

## 🛠️ Variables de entorno (Backend)

```env
PORT=3001
MONGODB_URI=mongodb://mongodb:27017/shopping_list
FRONTEND_URL=http://localhost:3000
NODE_ENV=development
```

---

## 📦 Dependencias

### Backend
- express
- mongoose
- typescript

### Frontend
- react
- axios
- typescript

---

## ✅ Estado del Proyecto

✔ Dockerizado  
✔ Listo para GitHub  
✔ Funciona en cualquier entorno  
