"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _mongoose = require("mongoose");
var productSchema = new _mongoose.Schema({
  name: {
    type: String,
    index: true
  },
  category: [{
    type: _mongoose.Schema.Types.ObjectId,
    ref: "Category"
  }],
  reference: {
    type: _mongoose.Schema.Types.ObjectId,
    ref: "Reference"
  },
  price: {
    type: Number,
    index: true
  },
  description: {
    type: String,
    index: true
  },
  stock: Number,
  imgs: [{
    _id: {
      type: _mongoose.Schema.Types.ObjectId,
      auto: true
    },
    url: String
  }],
  garmentType: [{
    type: _mongoose.Schema.Types.ObjectId,
    ref: "GarmentType"
  }],
  pieces: [{
    piece: String,
    sizes: [{
      name: String,
      inventory: Number,
      _id: {
        type: _mongoose.Schema.Types.ObjectId,
        auto: true
      }
    }],
    _id: {
      type: _mongoose.Schema.Types.ObjectId,
      auto: true
    }
  }]
}, {
  timestamps: true,
  versionKey: false
});
productSchema.index({
  name: "text",
  description: "text"
});
var _default = exports["default"] = (0, _mongoose.model)("Product", productSchema);