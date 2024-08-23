"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = exports.ROLES = void 0;
var _mongoose = require("mongoose");
// estos roles los importo en verifySignup para cuando colsuten venga aca y vea que existe alguno de este arreglo

var ROLES = exports.ROLES = ["user", "admin", "moderator"];

// este Schema va ser para el rol que tiene cada usario

var roleSchema = new _mongoose.Schema({
  name: String
}, {
  versionKey: false
});
var _default = exports["default"] = (0, _mongoose.model)('Role', roleSchema);