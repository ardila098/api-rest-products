"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.signup = exports.signin = void 0;

var _User = _interopRequireDefault(require("../models/User"));

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

var _config = _interopRequireDefault(require("../config"));

var _Role = _interopRequireDefault(require("../models/Role"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var signup = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(req, res) {
    var _req$body, username, email, password, roles, newUser, foundRole, role, savedUser, token;

    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            //desde req. body yo voy a esperar que el usuario me envie los datos
            _req$body = req.body, username = _req$body.username, email = _req$body.email, password = _req$body.password, roles = _req$body.roles;
            _context.t0 = _User["default"];
            _context.t1 = username;
            _context.t2 = email;
            _context.next = 6;
            return _User["default"].encryptPassword(password);

          case 6:
            _context.t3 = _context.sent;
            _context.t4 = {
              username: _context.t1,
              email: _context.t2,
              password: _context.t3
            };
            newUser = new _context.t0(_context.t4);

            if (!roles) {
              _context.next = 16;
              break;
            }

            _context.next = 12;
            return _Role["default"].find({
              name: {
                $in: roles
              }
            });

          case 12:
            foundRole = _context.sent;
            newUser.roles = foundRole.map(function (role) {
              return role._id;
            });
            _context.next = 20;
            break;

          case 16:
            _context.next = 18;
            return _Role["default"].findOne({
              name: "user"
            });

          case 18:
            role = _context.sent;
            newUser.roles = [role._id];

          case 20:
            _context.next = 22;
            return newUser.save();

          case 22:
            savedUser = _context.sent;
            console.log(savedUser); //con jwt genero el token

            token = _jsonwebtoken["default"].sign({
              id: savedUser._id
            }, _config["default"].SECRET, {
              expiresIn: 86400 // 24h

            });
            res.status(200).json({
              token: token
            });

          case 26:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function signup(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

exports.signup = signup;

var signin = /*#__PURE__*/function () {
  var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(req, res) {
    var userFound, matchPassword, token;
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.next = 2;
            return _User["default"].findOne({
              email: req.body.email
            }).populate("roles");

          case 2:
            userFound = _context2.sent;

            if (userFound) {
              _context2.next = 5;
              break;
            }

            return _context2.abrupt("return", res.status(400).json({
              message: "User not found"
            }));

          case 5:
            _context2.next = 7;
            return _User["default"].comparePassword(req.body.password, userFound.password);

          case 7:
            matchPassword = _context2.sent;

            if (matchPassword) {
              _context2.next = 10;
              break;
            }

            return _context2.abrupt("return", res.status(401).json({
              token: null,
              message: "invalid password"
            }));

          case 10:
            // con jwt le paso el objeto que quiero guardar que seria el id y desde confirg le paso el secret y lo guardo en una constante
            token = _jsonwebtoken["default"].sign({
              id: userFound._id
            }, _config["default"].SECRET, {
              expiresIn: 86400
            });
            res.json({
              token: token
            });

          case 12:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));

  return function signin(_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}();

exports.signin = signin;