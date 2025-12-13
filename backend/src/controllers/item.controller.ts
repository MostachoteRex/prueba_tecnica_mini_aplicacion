import { Request, Response } from 'express';
import { ItemService, CreateItemDTO, UpdateItemDTO } from '../services/item.service';

const itemService = new ItemService();

export class ItemController {
    async getAllItems(req: Request, res: Response): Promise<void> {
        try {
            const items = await itemService.getAllItems();
            res.json(items);
        } catch (error) {
            res.status(500).json({ error: 'Error al obtener los items' });
        }
    }

    async createItem(req: Request, res: Response): Promise<void> {
        try {
            const itemData: CreateItemDTO = req.body;

            if (!itemData.nombre || !itemData.cantidad) {
                res.status(400).json({ error: 'Nombre y cantidad son requeridos' });
                return;
            }

            const newItem = await itemService.createItem(itemData);
            res.status(201).json(newItem);
        } catch (error) {
            res.status(500).json({ error: 'Error al crear el item' });
        }
    }

    async updateItem(req: Request, res: Response): Promise<void> {
        try {
            const { id } = req.params;
            const itemData: UpdateItemDTO = req.body;

            const updatedItem = await itemService.updateItem(id, itemData);

            if (!updatedItem) {
                res.status(404).json({ error: 'Item no encontrado' });
                return;
            }

            res.json(updatedItem);
        } catch (error) {
            res.status(500).json({ error: 'Error al actualizar el item' });
        }
    }

    async deleteItem(req: Request, res: Response): Promise<void> {
        try {
            const { id } = req.params;
            const deleted = await itemService.deleteItem(id);

            if (!deleted) {
                res.status(404).json({ error: 'Item no encontrado' });
                return;
            }

            res.status(204).send();
        } catch (error) {
            res.status(500).json({ error: 'Error al eliminar el item' });
        }
    }

    async toggleItem(req: Request, res: Response): Promise<void> {
        try {
            const { id } = req.params;
            const toggledItem = await itemService.toggleItem(id);

            if (!toggledItem) {
                res.status(404).json({ error: 'Item no encontrado' });
                return;
            }

            res.json(toggledItem);
        } catch (error) {
            res.status(500).json({ error: 'Error al actualizar el item' });
        }
    }
}
