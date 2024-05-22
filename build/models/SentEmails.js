"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _console = require("console");

var _mongoose = require("mongoose");

var _querystring = require("querystring");

var sentEmailsSchema = new _mongoose.Schema({
  dot: String,
  name: String,
  email: String,
  phone: String
}, {
  timestamps: true,
  versionKey: false
});

var _default = (0, _mongoose.model)("SentEmail", sentEmailsSchema);

exports["default"] = _default;