import express from 'express';
import cors from 'cors';
import * as dotenv from 'dotenv';
import { connectDB } from './config/mongodb';
import itemRoutes from './routes/item.routes';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// Conectar a MongoDB
connectDB();

// Middleware
app.use(cors({
    origin: process.env.FRONTEND_URL || 'http://localhost:3000',
    credentials: true
}));
app.use(express.json());

// Rutas
app.use('/api', itemRoutes);

// Ruta de salud
app.get('/health', (req, res) => {
    const mongoose = require('mongoose');
    const dbStatus = mongoose.connection.readyState === 1 ? 'connected' : 'disconnected';

    res.json({
        status: 'OK',
        message: 'Servidor funcionando',
        database: dbStatus
    });
});

// Ruta raíz
app.get('/', (req, res) => {
    res.json({
        message: 'API de Lista de Compras con MongoDB',
        endpoints: {
            items: 'GET /api/items',
            createItem: 'POST /api/items',
            updateItem: 'PUT /api/items/:id',
            deleteItem: 'DELETE /api/items/:id',
            toggleItem: 'PATCH /api/items/:id/toggle'
        }
    });
});

// Manejo de errores
app.use((req, res) => {
  res.status(404).json({ error: 'Ruta no encontrada' });
});

app.listen(PORT, () => {
  console.log(`Servidor ejecutándose en http://localhost:${PORT}`);
});