import mongoose, { Schema, Document } from 'mongoose';

export interface IItem extends Document {
    nombre: string;
    cantidad: number;
    comprado: boolean;
    created_at: Date;
}

const ItemSchema: Schema = new Schema({
    nombre: {
        type: String,
        required: [true, 'El nombre es requerido'],
        trim: true,
        maxlength: [255, 'El nombre no puede exceder 255 caracteres']
    },
    cantidad: {
        type: Number,
        required: [true, 'La cantidad es requerida'],
        min: [1, 'La cantidad debe ser al menos 1'],
        default: 1
    },
    comprado: {
        type: Boolean,
        default: false
    },
    created_at: {
        type: Date,
        default: Date.now
    }
});

// Índices para mejor rendimiento
ItemSchema.index({ comprado: 1 });
ItemSchema.index({ created_at: -1 });

export const Item = mongoose.model<IItem>('Item', ItemSchema);