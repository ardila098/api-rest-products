"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _console = require("console");
var _mongoose = require("mongoose");
var _querystring = require("querystring");
var sliderSchema = new _mongoose.Schema({
  name: String,
  description: String,
  items: [{
    nameItem: String,
    description: String,
    category: String,
    imgs: [{
      _id: {
        type: _mongoose.Schema.Types.ObjectId,
        auto: true
      },
      url: String
    }]
  }]
}, {
  timestamps: true,
  versionKey: false
});
var _default = exports["default"] = (0, _mongoose.model)("Slider", sliderSchema);