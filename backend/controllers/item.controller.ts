import { Request, Response } from 'express';
import { ItemService } from '../src/services/item.services';
import { CreateItemDTO, UpdateItemDTO } from '../src/models/item.model';

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
            const id = parseInt(req.params.id);
            const itemData: UpdateItemDTO = req.body;

            if (isNaN(id)) {
                res.status(400).json({ error: 'ID inválido' });
                return;
            }

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
            const id = parseInt(req.params.id);

            if (isNaN(id)) {
                res.status(400).json({ error: 'ID inválido' });
                return;
            }

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
}