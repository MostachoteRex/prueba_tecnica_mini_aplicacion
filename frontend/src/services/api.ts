import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:3001/api';

const api = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

export const itemAPI = {
    // Obtener todos los items
    getAllItems: () => api.get('/items'),

    // Crear un nuevo item
    createItem: (item: { nombre: string; cantidad: number }) =>
        api.post('/items', item),

    // Actualizar un item
    updateItem: (id: number, data: { comprado?: boolean; nombre?: string; cantidad?: number }) =>
        api.put(`/items/${id}`, data),

    // Eliminar un item
    deleteItem: (id: number) => api.delete(`/items/${id}`),
};