import { pool } from '../src/config/database';
import { Item, CreateItemDTO, UpdateItemDTO } from '../src/models/item.model';

export class ItemService {
    async getAllItems(): Promise<Item[]> {
        const result = await pool.query('SELECT * FROM items_compra ORDER BY id');
        return result.rows;
    }

    async getItemById(id: number): Promise<Item | null> {
        const result = await pool.query('SELECT * FROM items_compra WHERE id = $1', [id]);
        return result.rows[0] || null;
    }

    async createItem(item: CreateItemDTO): Promise<Item> {
        const { nombre, cantidad, comprado } = item;
        const result = await pool.query(
            'INSERT INTO items_compra (nombre, cantidad, comprado) VALUES ($1, $2, $3) RETURNING *',
            [nombre, cantidad, comprado || false]
        );
        return result.rows[0];
    }

    async updateItem(id: number, item: UpdateItemDTO): Promise<Item | null> {
        const existingItem = await this.getItemById(id);
        if (!existingItem) return null;

        const { nombre, cantidad, comprado } = item;
        const result = await pool.query(
            `UPDATE items_compra 
       SET nombre = COALESCE($1, nombre),
           cantidad = COALESCE($2, cantidad),
           comprado = COALESCE($3, comprado)
       WHERE id = $4 RETURNING *`,
            [nombre, cantidad, comprado, id]
        );
        return result.rows[0];
    }

    async deleteItem(id: number): Promise<boolean> {
        const result = await pool.query('DELETE FROM items_compra WHERE id = $1 RETURNING id', [id]);
        return (result.rowCount ?? 0) > 0;
    }
}