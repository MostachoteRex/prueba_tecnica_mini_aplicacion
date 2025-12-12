CREATE TABLE IF NOT EXISTS items_compra (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(255) NOT NULL,
    cantidad INTEGER NOT NULL DEFAULT 1,
    comprado BOOLEAN NOT NULL DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_items_comprado ON items_compra(comprado);

COMMENT ON TABLE items_compra IS 'Tabla para almacenar items de la lista de compras';
COMMENT ON COLUMN items_compra.id IS 'Identificador único auto-incremental';
COMMENT ON COLUMN items_compra.nombre IS 'Nombre del producto';
COMMENT ON COLUMN items_compra.cantidad IS 'Cantidad a comprar (default: 1)';
COMMENT ON COLUMN items_compra.comprado IS 'Estado de compra: TRUE=comprado, FALSE=pendiente';
COMMENT ON COLUMN items_compra.created_at IS 'Fecha y hora de creación del registro';

INSERT INTO items_compra (nombre, cantidad, comprado) VALUES
('Manzanas', 5, false),
('Leche', 2, true),
('Pan', 1, false),
('Huevos', 12, false)
ON CONFLICT DO NOTHING;