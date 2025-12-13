const { Pool } = require('pg');
const mongoose = require('mongoose');
require('dotenv').config();

async function migrateData() {
    console.log('Iniciando migración de PostgreSQL a MongoDB...');

    // Configurar conexión a PostgreSQL
    const pgPool = new Pool({
        host: process.env.DB_HOST || 'localhost',
        port: process.env.DB_PORT || 5432,
        database: process.env.DB_NAME || 'shopping_list',
        user: process.env.DB_USER || 'postgres',
        password: process.env.DB_PASSWORD || '',
    });

    // Configurar conexión a MongoDB
    const mongoURI = process.env.MONGODB_URI || 'mongodb://localhost:27017/shopping_list';
    await mongoose.connect(mongoURI);

    try {
        // 1. Obtener datos de PostgreSQL
        console.log('Obteniendo datos de PostgreSQL...');
        const pgResult = await pgPool.query('SELECT * FROM items_compra ORDER BY id');
        const pgItems = pgResult.rows;

        console.log(`Encontrados ${pgItems.length} items en PostgreSQL`);

        // 2. Preparar modelo de MongoDB
        const Item = mongoose.model('Item', new mongoose.Schema({
            nombre: String,
            cantidad: Number,
            comprado: Boolean,
            created_at: Date
        }));

        // 3. Limpiar colección existente en MongoDB
        await Item.deleteMany({});
        console.log('Colección de MongoDB limpiada');

        // 4. Migrar datos
        const mongoItems = pgItems.map(item => ({
            nombre: item.nombre,
            cantidad: item.cantidad,
            comprado: item.comprado,
            created_at: item.created_at || new Date()
        }));

        if (mongoItems.length > 0) {
            await Item.insertMany(mongoItems);
            console.log(`${mongoItems.length} items migrados a MongoDB`);
        }

        // 5. Verificar migración
        const count = await Item.countDocuments();
        console.log(`Verificación: ${count} items en MongoDB`);

    } catch (error) {
        console.error('Error durante la migración:', error);
    } finally {
        // Cerrar conexiones
        await pgPool.end();
        await mongoose.connection.close();
        console.log('Conexiones cerradas');
    }
}

migrateData();