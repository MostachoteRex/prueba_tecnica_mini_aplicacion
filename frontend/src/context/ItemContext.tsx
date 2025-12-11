import React, { createContext, useState, useContext, ReactNode } from 'react';
import { Item } from '../types/item';
import { itemAPI } from '../services/api';

interface ItemContextType {
    items: Item[];
    loading: boolean;
    error: string | null;
    fetchItems: () => Promise<void>;
    addItem: (nombre: string, cantidad: number) => Promise<void>;
    toggleItem: (id: number, comprado: boolean) => Promise<void>;
    deleteItem: (id: number) => Promise<void>;
}

const ItemContext = createContext<ItemContextType | undefined>(undefined);

export const useItems = () => {
    const context = useContext(ItemContext);
    if (!context) {
        throw new Error('useItems debe ser usado dentro de ItemProvider');
    }
    return context;
};

interface ItemProviderProps {
    children: ReactNode;
}

export const ItemProvider: React.FC<ItemProviderProps> = ({ children }) => {
    const [items, setItems] = useState<Item[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const fetchItems = async () => {
        setLoading(true);
        setError(null);
        try {
            const response = await itemAPI.getAllItems();
            setItems(response.data as Item[]);
        } catch (err) {
            setError('Error al cargar los items');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const addItem = async (nombre: string, cantidad: number) => {
        setLoading(true);
        setError(null);
        try {
            const response = await itemAPI.createItem({ nombre, cantidad });
            setItems(prev => [...prev, response.data as Item]);
        } catch (err) {
            setError('Error al agregar el item');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const toggleItem = async (id: number, comprado: boolean) => {
        setLoading(true);
        try {
            const response = await itemAPI.updateItem(id, { comprado: !comprado });
            setItems(prev =>
                prev.map(item => item.id === id ? (response.data as Item) : item)
            );
        } catch (err) {
            setError('Error al actualizar el item');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const deleteItem = async (id: number) => {
        setLoading(true);
        try {
            await itemAPI.deleteItem(id);
            setItems(prev => prev.filter(item => item.id !== id));
        } catch (err) {
            setError('Error al eliminar el item');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <ItemContext.Provider value={{
            items,
            loading,
            error,
            fetchItems,
            addItem,
            toggleItem,
            deleteItem
        }}>
            {children}
        </ItemContext.Provider>
    );
};