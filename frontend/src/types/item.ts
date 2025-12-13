export interface Item {
    _id: string;
    nombre: string;
    cantidad: number;
    comprado: boolean;
    created_at: string;
}

export interface CreateItemDTO {
    nombre: string;
    cantidad: number;
}