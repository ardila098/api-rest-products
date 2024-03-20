const mongoose = require('mongoose');

// Esquema para los tamaños
const sizeSchema = new mongoose.Schema({
 name: String, // Nombre del tamaño, por ejemplo, "S", "M", "L"
 quantity: Number, // Cantidad disponible de ese tamaño
});

// Esquema para las piezas con múltiples tamaños
const sizesSchema = new mongoose.Schema({
 piece: String, // Nombre de la pieza, por ejemplo, "bracier", "pantie"
 sizes: [sizeSchema], // Array de tamaños disponibles para esta pieza
});

module.exports = mongoose.model('Sizes', sizesSchema);
