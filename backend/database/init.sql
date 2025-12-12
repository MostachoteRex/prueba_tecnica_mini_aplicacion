INSERT INTO items_compra (nombre, cantidad, comprado) VALUES
('Manzanas', 5, false),
('Leche', 2, true),
('Pan', 1, false),
('Huevos', 12, false),
('Café', 1, false),
('Arroz', 2, true)
ON CONFLICT DO NOTHING;