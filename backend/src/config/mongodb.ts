import mongoose from 'mongoose';
import * as dotenv from 'dotenv';

dotenv.config();

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://mongodb:27017/shopping_list';

export const connectDB = async (): Promise<void> => {
    try {
        await mongoose.connect(MONGODB_URI);
        console.log('MongoDB conectado exitosamente');
    } catch (error) {
        console.error('Error conectando a MongoDB:', error);
    }
};

// Eventos de conexión
mongoose.connection.on('connected', () => {
    console.log('Mongoose conectado a la base de datos');
});

mongoose.connection.on('error', (err) => {
    console.error('Error de conexión de Mongoose:', err);
});

mongoose.connection.on('disconnected', () => {
    console.log('Mongoose desconectado');
});

export default mongoose;