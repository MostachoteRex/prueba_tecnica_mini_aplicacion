export interface Item {
    id: number;
    nombre: string;
    cantidad: number;
    comprado: boolean;
    created_at?: string;
}

export interface CreateItemDTO {
    nombre: string;
    cantidad: number;
    comprado?: boolean;
}