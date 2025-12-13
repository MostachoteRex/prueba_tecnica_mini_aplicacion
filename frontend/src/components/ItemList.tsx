import React, { useState } from 'react';
import { useItems } from '../context/ItemContext';
import './ItemList.css';

const ItemList: React.FC = () => {
    const { items, loading, error, addItem, toggleItem, deleteItem } = useItems();
    const [newItem, setNewItem] = useState({ nombre: '', cantidad: 1 });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (newItem.nombre.trim() && newItem.cantidad > 0) {
            await addItem(newItem.nombre.trim(), newItem.cantidad);
            setNewItem({ nombre: '', cantidad: 1 });
        }
    };

    const handleToggle = async (id: string) => {
        await toggleItem(id);
    };

    const handleDelete = async (id: string) => {
        if (window.confirm('¿Estás seguro de eliminar este item?')) {
            await deleteItem(id);
        }
    };

    return (
        <div className="shopping-list-container">
            <h1>🛒 Lista de Compras</h1>

            {error && <div className="error">{error}</div>}

            <form onSubmit={handleSubmit} className="add-item-form">
                <input
                    type="text"
                    value={newItem.nombre}
                    onChange={(e) => setNewItem({ ...newItem, nombre: e.target.value })}
                    placeholder="Nombre del item"
                    required
                    disabled={loading}
                />
                <input
                    type="number"
                    value={newItem.cantidad}
                    onChange={(e) => setNewItem({ ...newItem, cantidad: parseInt(e.target.value) || 1 })}
                    min="1"
                    required
                    disabled={loading}
                />
                <button type="submit" disabled={loading || !newItem.nombre.trim()}>
                    {loading ? 'Agregando...' : 'Agregar'}
                </button>
            </form>

            <div className="items-list">
                {loading && items.length === 0 ? (
                    <p className="loading">Cargando items...</p>
                ) : items.length === 0 ? (
                    <p className="empty-list">No hay items en la lista</p>
                ) : (
                    <ul>
                        {items.map((item) => (
                            <li key={item._id} className={`item ${item.comprado ? 'completed' : ''}`}>
                                <div className="item-info">
                                    <span className="item-name">{item.nombre}</span>
                                    <span className="item-quantity">Cantidad: {item.cantidad}</span>
                                </div>
                                <div className="item-actions">
                                    <button
                                        onClick={() => handleToggle(item._id)}
                                        className={`toggle-btn ${item.comprado ? 'purchased' : ''}`}
                                        disabled={loading}
                                    >
                                        {item.comprado ? '✓ Comprado' : 'Marcar'}
                                    </button>
                                    <button
                                        onClick={() => handleDelete(item._id)}
                                        className="delete-btn"
                                        disabled={loading}
                                    >
                                        🗑️
                                    </button>
                                </div>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </div>
    );
};

export default ItemList;