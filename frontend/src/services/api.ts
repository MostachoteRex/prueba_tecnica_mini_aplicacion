import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:3001/api';

const api = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

export const itemAPI = {
    getAllItems: () => api.get('/items'),
    createItem: (item: { nombre: string; cantidad: number }) =>
        api.post('/items', item),
    updateItem: (id: string, data: { comprado?: boolean; nombre?: string; cantidad?: number }) =>
        api.put(`/items/${id}`, data),
    toggleItem: (id: string) => api.patch(`/items/${id}/toggle`),
    deleteItem: (id: string) => api.delete(`/items/${id}`),
};