"use strict";

var mongoose = require("mongoose");
var referenceSchema = new mongoose.Schema({
  name: String
});
module.exports = mongoose.model("Reference", referenceSchema);