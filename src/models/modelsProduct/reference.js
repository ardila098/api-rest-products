const mongoose = require("mongoose");

const referenceSchema = new mongoose.Schema({
  name: String,
});

module.exports = mongoose.model("Reference", referenceSchema);
