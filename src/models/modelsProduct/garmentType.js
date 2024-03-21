const mongoose = require("mongoose");

// Esquema para los tamaños
const sizeSchema = new mongoose.Schema({
  name: String, // Nombre del tamaño, por ejemplo, "S", "M", "L"
  inventory: Number // Cantidad disponible para este tamaño
 });

// Esquema para las piezas con múltiples tamaños
const sizesSchema = new mongoose.Schema({
  piece: String, // Nombre de la pieza, por ejemplo, "bracier", "pantie"
  sizes: [sizeSchema], // Array de tamaños disponibles para esta pieza
});

// Esquema para el vestido de baño que incluye diferentes piezas con sus tamaños
const garmentTypeSchema = new mongoose.Schema({
  name: String, // Nombre del vestido de baño
  pieces: [sizesSchema], // Array de piezas con sus tamaños
});

module.exports = mongoose.model("GarmentType", garmentTypeSchema);

