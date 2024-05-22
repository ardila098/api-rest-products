"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.verifyToken = exports.isModerator = exports.isAdmin = void 0;

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

var _config = _interopRequireDefault(require("../config"));

var _User = _interopRequireDefault(require("../models/User"));

var _Role = _interopRequireDefault(require("../models/Role"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

//este da la autorizacion
// este es que va a validar si al final es un moderador , es un admin , es un user
//voy a crear una funcion que se encarga de verificar si estoy enviando un token
var verifyToken = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(req, res, next) {
    var token, decoded, user;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            //guardar la propiedad de x-acces en la prpiedad token
            token = req.headers["x-access-token"];
            console.log(token); // voy a comprovar si el token es valido
            // voy a comprobar primero si me envian la cabecera osea el xaccestoken
            // si no hay token me devuelve un codigo de error 400 con un mensaje

            if (token) {
              _context.next = 5;
              break;
            }

            return _context.abrupt("return", res.status(403).json({
              message: "no token provided"
            }));

          case 5:
            // si si existe el token quiero que me retorne el id del token
            //el config.SECRET me va traer el valor de lo que esta adentro del token
            // y extraemos el valor del token en un objeto que se llama decoded
            decoded = _jsonwebtoken["default"].verify(token, _config["default"].SECRET);
            console.log(decoded);
            req.userId = decoded.id; //ahora vamos hacer una busqueda , si del modelo de User id

            _context.next = 10;
            return _User["default"].findById(req.userId, {
              password: 0
            });

          case 10:
            user = _context.sent;
            console.log(user);

            if (user) {
              _context.next = 14;
              break;
            }

            return _context.abrupt("return", res.status(404).json({
              message: 'no user found'
            }));

          case 14:
            //next es para que despues de comprobar el token siga con la ejecucion del codigo
            next();
            _context.next = 20;
            break;

          case 17:
            _context.prev = 17;
            _context.t0 = _context["catch"](0);
            return _context.abrupt("return", res.status(401).json({
              message: 'User not Unauthorized'
            }));

          case 20:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[0, 17]]);
  }));

  return function verifyToken(_x, _x2, _x3) {
    return _ref.apply(this, arguments);
  };
}(); // ahora vamos a verificar si es un admin , es un moderador o un usuario normal
//vamos a crear dos funciones para moderator y para admin
//moderator


exports.verifyToken = verifyToken;

var isModerator = /*#__PURE__*/function () {
  var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(req, res, next) {
    var user, roles, i;
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.next = 2;
            return _User["default"].findById(req.userId);

          case 2:
            user = _context2.sent;
            _context2.next = 5;
            return _Role["default"].find({
              _id: {
                $in: user.roles
              }
            });

          case 5:
            roles = _context2.sent;
            console.log(roles); //este bubque va empezar en = y va recorrer hasta la multitud del arreglo de roles y sumara de 1 en 1
            // si el role que estoy recorriendo su nombre es igual a moderator entonces continua

            i = 0;

          case 8:
            if (!(i < roles.length)) {
              _context2.next = 15;
              break;
            }

            if (!(roles[i].name === "moderator")) {
              _context2.next = 12;
              break;
            }

            next();
            return _context2.abrupt("return");

          case 12:
            i++;
            _context2.next = 8;
            break;

          case 15:
            return _context2.abrupt("return", res.status(403).json({
              message: "Require Moderator Role"
            }));

          case 16:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));

  return function isModerator(_x4, _x5, _x6) {
    return _ref2.apply(this, arguments);
  };
}(); //admin


exports.isModerator = isModerator;

var isAdmin = /*#__PURE__*/function () {
  var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(req, res, next) {
    var user, roles, i;
    return regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.next = 2;
            return _User["default"].findById(req.userId);

          case 2:
            user = _context3.sent;
            _context3.next = 5;
            return _Role["default"].find({
              _id: {
                $in: user.roles
              }
            });

          case 5:
            roles = _context3.sent;
            console.log(roles); //este bubque va empezar en = y va recorrer hasta la multitud del arreglo de roles y sumara de 1 en 1
            // si el role que estoy recorriendo su nombre es igual a moderator entonces continua

            i = 0;

          case 8:
            if (!(i < roles.length)) {
              _context3.next = 15;
              break;
            }

            if (!(roles[i].name === "admin")) {
              _context3.next = 12;
              break;
            }

            next();
            return _context3.abrupt("return");

          case 12:
            i++;
            _context3.next = 8;
            break;

          case 15:
            return _context3.abrupt("return", res.status(403).json({
              message: "Require admin Role"
            }));

          case 16:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3);
  }));

  return function isAdmin(_x7, _x8, _x9) {
    return _ref3.apply(this, arguments);
  };
}();

exports.isAdmin = isAdmin;