export interface Item {
    id: number;
    nombre: string;
    cantidad: number;
    comprado: boolean;
    created_at?: Date;
}

export interface CreateItemDTO {
    nombre: string;
    cantidad: number;
    comprado?: boolean;
}

export interface UpdateItemDTO {
    comprado?: boolean;
    nombre?: string;
    cantidad?: number;
}