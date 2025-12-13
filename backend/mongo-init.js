db = db.getSiblingDB('shopping_list');

db.createCollection('items');

db.items.insertMany([
    {
        nombre: 'Manzanas',
        cantidad: 5,
        comprado: false,
        created_at: new Date()
    },
    {
        nombre: 'Leche',
        cantidad: 2,
        comprado: true,
        created_at: new Date()
    },
    {
        nombre: 'Pan',
        cantidad: 1,
        comprado: false,
        created_at: new Date()
    },
    {
        nombre: 'Huevos',
        cantidad: 12,
        comprado: false,
        created_at: new Date()
    }
]);

print('MongoDB inicializado con datos de ejemplo');