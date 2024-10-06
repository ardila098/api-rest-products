"use strict";

var _mongoose = _interopRequireDefault(require("mongoose"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
//hago la conexion con mongo y localhost y la base de datos se va llamar companydb y le pongo un then y cash para verificar conexion

_mongoose["default"].connect("mongodb://127.0.0.1:27017/companydb", {
  useNewUrlParser: true,
  useUniFiedTopology: true
}).then(function (db) {
  return console.log('Db is conected');
})["catch"](function (error) {
  return console.log(error);
});