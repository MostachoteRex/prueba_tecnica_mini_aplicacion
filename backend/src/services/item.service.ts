import { Item, IItem } from '../models/item.model';

export interface CreateItemDTO {
    nombre: string;
    cantidad: number;
    comprado?: boolean;
}

export interface UpdateItemDTO {
    nombre?: string;
    cantidad?: number;
    comprado?: boolean;
}

export class ItemService {
    async getAllItems(): Promise<IItem[]> {
        return await Item.find().sort({ created_at: -1 });
    }

    async getItemById(id: string): Promise<IItem | null> {
        return await Item.findById(id);
    }

    async createItem(itemData: CreateItemDTO): Promise<IItem> {
        const item = new Item(itemData);
        return await item.save();
    }

    async updateItem(id: string, itemData: UpdateItemDTO): Promise<IItem | null> {
        return await Item.findByIdAndUpdate(
            id,
            { ...itemData, updated_at: Date.now() },
            { new: true, runValidators: true }
        );
    }

    async deleteItem(id: string): Promise<boolean> {
        const result = await Item.findByIdAndDelete(id);
        return result !== null;
    }

    async toggleItem(id: string): Promise<IItem | null> {
        const item = await Item.findById(id);
        if (!item) return null;

        item.comprado = !item.comprado;
        return await item.save();
    }
}
