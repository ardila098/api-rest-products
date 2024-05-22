"use strict";

var _mongoose = _interopRequireDefault(require("mongoose"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

//hago la conexion con mongo y localhost y la base de datos se va llamar companydb y le pongo un then y cash para verificar conexion
_mongoose["default"].connect("mongodb://Localhost/insurancedb", {
  useNewUrlParser: true,
  useUniFiedTopology: true
}).then(function (db) {
  return console.log('Db is conected');
})["catch"](function (error) {
  return console.log(error);
});