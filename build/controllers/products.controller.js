"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.updateProductById = exports.getProducts = exports.getProductById = exports.deleteProduct = exports.createProduct = void 0;
var _Product = _interopRequireDefault(require("../models/Product"));
var _sharp = _interopRequireDefault(require("sharp"));
var _fs = _interopRequireDefault(require("fs"));
var _path = _interopRequireDefault(require("path"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function _toConsumableArray(r) { return _arrayWithoutHoles(r) || _iterableToArray(r) || _unsupportedIterableToArray(r) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _iterableToArray(r) { if ("undefined" != typeof Symbol && null != r[Symbol.iterator] || null != r["@@iterator"]) return Array.from(r); }
function _arrayWithoutHoles(r) { if (Array.isArray(r)) return _arrayLikeToArray(r); }
function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return e; }; var t, e = {}, r = Object.prototype, n = r.hasOwnProperty, o = Object.defineProperty || function (t, e, r) { t[e] = r.value; }, i = "function" == typeof Symbol ? Symbol : {}, a = i.iterator || "@@iterator", c = i.asyncIterator || "@@asyncIterator", u = i.toStringTag || "@@toStringTag"; function define(t, e, r) { return Object.defineProperty(t, e, { value: r, enumerable: !0, configurable: !0, writable: !0 }), t[e]; } try { define({}, ""); } catch (t) { define = function define(t, e, r) { return t[e] = r; }; } function wrap(t, e, r, n) { var i = e && e.prototype instanceof Generator ? e : Generator, a = Object.create(i.prototype), c = new Context(n || []); return o(a, "_invoke", { value: makeInvokeMethod(t, r, c) }), a; } function tryCatch(t, e, r) { try { return { type: "normal", arg: t.call(e, r) }; } catch (t) { return { type: "throw", arg: t }; } } e.wrap = wrap; var h = "suspendedStart", l = "suspendedYield", f = "executing", s = "completed", y = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var p = {}; define(p, a, function () { return this; }); var d = Object.getPrototypeOf, v = d && d(d(values([]))); v && v !== r && n.call(v, a) && (p = v); var g = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(p); function defineIteratorMethods(t) { ["next", "throw", "return"].forEach(function (e) { define(t, e, function (t) { return this._invoke(e, t); }); }); } function AsyncIterator(t, e) { function invoke(r, o, i, a) { var c = tryCatch(t[r], t, o); if ("throw" !== c.type) { var u = c.arg, h = u.value; return h && "object" == _typeof(h) && n.call(h, "__await") ? e.resolve(h.__await).then(function (t) { invoke("next", t, i, a); }, function (t) { invoke("throw", t, i, a); }) : e.resolve(h).then(function (t) { u.value = t, i(u); }, function (t) { return invoke("throw", t, i, a); }); } a(c.arg); } var r; o(this, "_invoke", { value: function value(t, n) { function callInvokeWithMethodAndArg() { return new e(function (e, r) { invoke(t, n, e, r); }); } return r = r ? r.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(e, r, n) { var o = h; return function (i, a) { if (o === f) throw Error("Generator is already running"); if (o === s) { if ("throw" === i) throw a; return { value: t, done: !0 }; } for (n.method = i, n.arg = a;;) { var c = n.delegate; if (c) { var u = maybeInvokeDelegate(c, n); if (u) { if (u === y) continue; return u; } } if ("next" === n.method) n.sent = n._sent = n.arg;else if ("throw" === n.method) { if (o === h) throw o = s, n.arg; n.dispatchException(n.arg); } else "return" === n.method && n.abrupt("return", n.arg); o = f; var p = tryCatch(e, r, n); if ("normal" === p.type) { if (o = n.done ? s : l, p.arg === y) continue; return { value: p.arg, done: n.done }; } "throw" === p.type && (o = s, n.method = "throw", n.arg = p.arg); } }; } function maybeInvokeDelegate(e, r) { var n = r.method, o = e.iterator[n]; if (o === t) return r.delegate = null, "throw" === n && e.iterator["return"] && (r.method = "return", r.arg = t, maybeInvokeDelegate(e, r), "throw" === r.method) || "return" !== n && (r.method = "throw", r.arg = new TypeError("The iterator does not provide a '" + n + "' method")), y; var i = tryCatch(o, e.iterator, r.arg); if ("throw" === i.type) return r.method = "throw", r.arg = i.arg, r.delegate = null, y; var a = i.arg; return a ? a.done ? (r[e.resultName] = a.value, r.next = e.nextLoc, "return" !== r.method && (r.method = "next", r.arg = t), r.delegate = null, y) : a : (r.method = "throw", r.arg = new TypeError("iterator result is not an object"), r.delegate = null, y); } function pushTryEntry(t) { var e = { tryLoc: t[0] }; 1 in t && (e.catchLoc = t[1]), 2 in t && (e.finallyLoc = t[2], e.afterLoc = t[3]), this.tryEntries.push(e); } function resetTryEntry(t) { var e = t.completion || {}; e.type = "normal", delete e.arg, t.completion = e; } function Context(t) { this.tryEntries = [{ tryLoc: "root" }], t.forEach(pushTryEntry, this), this.reset(!0); } function values(e) { if (e || "" === e) { var r = e[a]; if (r) return r.call(e); if ("function" == typeof e.next) return e; if (!isNaN(e.length)) { var o = -1, i = function next() { for (; ++o < e.length;) if (n.call(e, o)) return next.value = e[o], next.done = !1, next; return next.value = t, next.done = !0, next; }; return i.next = i; } } throw new TypeError(_typeof(e) + " is not iterable"); } return GeneratorFunction.prototype = GeneratorFunctionPrototype, o(g, "constructor", { value: GeneratorFunctionPrototype, configurable: !0 }), o(GeneratorFunctionPrototype, "constructor", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, u, "GeneratorFunction"), e.isGeneratorFunction = function (t) { var e = "function" == typeof t && t.constructor; return !!e && (e === GeneratorFunction || "GeneratorFunction" === (e.displayName || e.name)); }, e.mark = function (t) { return Object.setPrototypeOf ? Object.setPrototypeOf(t, GeneratorFunctionPrototype) : (t.__proto__ = GeneratorFunctionPrototype, define(t, u, "GeneratorFunction")), t.prototype = Object.create(g), t; }, e.awrap = function (t) { return { __await: t }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, c, function () { return this; }), e.AsyncIterator = AsyncIterator, e.async = function (t, r, n, o, i) { void 0 === i && (i = Promise); var a = new AsyncIterator(wrap(t, r, n, o), i); return e.isGeneratorFunction(r) ? a : a.next().then(function (t) { return t.done ? t.value : a.next(); }); }, defineIteratorMethods(g), define(g, u, "Generator"), define(g, a, function () { return this; }), define(g, "toString", function () { return "[object Generator]"; }), e.keys = function (t) { var e = Object(t), r = []; for (var n in e) r.push(n); return r.reverse(), function next() { for (; r.length;) { var t = r.pop(); if (t in e) return next.value = t, next.done = !1, next; } return next.done = !0, next; }; }, e.values = values, Context.prototype = { constructor: Context, reset: function reset(e) { if (this.prev = 0, this.next = 0, this.sent = this._sent = t, this.done = !1, this.delegate = null, this.method = "next", this.arg = t, this.tryEntries.forEach(resetTryEntry), !e) for (var r in this) "t" === r.charAt(0) && n.call(this, r) && !isNaN(+r.slice(1)) && (this[r] = t); }, stop: function stop() { this.done = !0; var t = this.tryEntries[0].completion; if ("throw" === t.type) throw t.arg; return this.rval; }, dispatchException: function dispatchException(e) { if (this.done) throw e; var r = this; function handle(n, o) { return a.type = "throw", a.arg = e, r.next = n, o && (r.method = "next", r.arg = t), !!o; } for (var o = this.tryEntries.length - 1; o >= 0; --o) { var i = this.tryEntries[o], a = i.completion; if ("root" === i.tryLoc) return handle("end"); if (i.tryLoc <= this.prev) { var c = n.call(i, "catchLoc"), u = n.call(i, "finallyLoc"); if (c && u) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } else if (c) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); } else { if (!u) throw Error("try statement without catch or finally"); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } } } }, abrupt: function abrupt(t, e) { for (var r = this.tryEntries.length - 1; r >= 0; --r) { var o = this.tryEntries[r]; if (o.tryLoc <= this.prev && n.call(o, "finallyLoc") && this.prev < o.finallyLoc) { var i = o; break; } } i && ("break" === t || "continue" === t) && i.tryLoc <= e && e <= i.finallyLoc && (i = null); var a = i ? i.completion : {}; return a.type = t, a.arg = e, i ? (this.method = "next", this.next = i.finallyLoc, y) : this.complete(a); }, complete: function complete(t, e) { if ("throw" === t.type) throw t.arg; return "break" === t.type || "continue" === t.type ? this.next = t.arg : "return" === t.type ? (this.rval = this.arg = t.arg, this.method = "return", this.next = "end") : "normal" === t.type && e && (this.next = e), y; }, finish: function finish(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.finallyLoc === t) return this.complete(r.completion, r.afterLoc), resetTryEntry(r), y; } }, "catch": function _catch(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.tryLoc === t) { var n = r.completion; if ("throw" === n.type) { var o = n.arg; resetTryEntry(r); } return o; } } throw Error("illegal catch attempt"); }, delegateYield: function delegateYield(e, r, n) { return this.delegate = { iterator: values(e), resultName: r, nextLoc: n }, "next" === this.method && (this.arg = t), y; } }, e; }
function _createForOfIteratorHelper(r, e) { var t = "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (!t) { if (Array.isArray(r) || (t = _unsupportedIterableToArray(r)) || e && r && "number" == typeof r.length) { t && (r = t); var _n = 0, F = function F() {}; return { s: F, n: function n() { return _n >= r.length ? { done: !0 } : { done: !1, value: r[_n++] }; }, e: function e(r) { throw r; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var o, a = !0, u = !1; return { s: function s() { t = t.call(r); }, n: function n() { var r = t.next(); return a = r.done, r; }, e: function e(r) { u = !0, o = r; }, f: function f() { try { a || null == t["return"] || t["return"](); } finally { if (u) throw o; } } }; }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }
var mongoose = require("mongoose");
var createProduct = exports.createProduct = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee(req, res) {
    var categoryArray, categoryIds, imgs, _iterator, _step, file, sharpenedBuffer, sharpenedUrl, savePath, pieces, newProduct, savedProduct;
    return _regeneratorRuntime().wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          categoryArray = req.body.category.split(",");
          categoryIds = categoryArray.map(function (id) {
            return mongoose.Types.ObjectId(id);
          });
          imgs = [];
          _iterator = _createForOfIteratorHelper(req.files);
          _context.prev = 4;
          _iterator.s();
        case 6:
          if ((_step = _iterator.n()).done) {
            _context.next = 25;
            break;
          }
          file = _step.value;
          _context.prev = 8;
          _context.next = 11;
          return (0, _sharp["default"])(file.path).sharpen().toBuffer();
        case 11:
          sharpenedBuffer = _context.sent;
          sharpenedUrl = "".concat(file.filename);
          savePath = _path["default"].join(__dirname, "..", "images", sharpenedUrl);
          _fs["default"].mkdirSync(_path["default"].dirname(savePath), {
            recursive: true
          });
          _context.next = 17;
          return (0, _sharp["default"])(sharpenedBuffer).toFile(savePath);
        case 17:
          imgs.push({
            url: sharpenedUrl
          });
          _context.next = 23;
          break;
        case 20:
          _context.prev = 20;
          _context.t0 = _context["catch"](8);
          console.error("Error processing image:", _context.t0);
        case 23:
          _context.next = 6;
          break;
        case 25:
          _context.next = 30;
          break;
        case 27:
          _context.prev = 27;
          _context.t1 = _context["catch"](4);
          _iterator.e(_context.t1);
        case 30:
          _context.prev = 30;
          _iterator.f();
          return _context.finish(30);
        case 33:
          pieces = JSON.parse(req.body.pieces);
          newProduct = new _Product["default"]({
            name: req.body.name,
            price: req.body.price,
            description: req.body.description,
            category: categoryIds,
            garmentType: req.body.garmentType,
            stock: req.body.stock,
            reference: req.body.reference,
            pieces: pieces,
            imgs: imgs
          });
          _context.prev = 35;
          _context.next = 38;
          return newProduct.save();
        case 38:
          savedProduct = _context.sent;
          res.status(201).json(savedProduct);
          _context.next = 46;
          break;
        case 42:
          _context.prev = 42;
          _context.t2 = _context["catch"](35);
          console.error("Error saving product:", _context.t2);
          res.status(500).json({
            error: "Error creating product"
          });
        case 46:
        case "end":
          return _context.stop();
      }
    }, _callee, null, [[4, 27, 30, 33], [8, 20], [35, 42]]);
  }));
  return function createProduct(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();
var getProducts = exports.getProducts = /*#__PURE__*/function () {
  var _ref2 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee2(req, res) {
    var _req$query, search, category, reference, color, filters, products;
    return _regeneratorRuntime().wrap(function _callee2$(_context2) {
      while (1) switch (_context2.prev = _context2.next) {
        case 0:
          _req$query = req.query, search = _req$query.search, category = _req$query.category, reference = _req$query.reference, color = _req$query.color;
          filters = {};
          if (search) {
            filters.$text = {
              $search: search
            };
          }
          if (category) {
            filters.category = mongoose.Types.ObjectId(category);
          }
          if (reference) {
            filters.reference = mongoose.Types.ObjectId(reference);
          }
          if (color) {
            filters["pieces.sizes.color"] = color;
          }
          _context2.prev = 6;
          _context2.next = 9;
          return _Product["default"].find(filters).populate("category reference");
        case 9:
          products = _context2.sent;
          res.status(200).json(products);
          _context2.next = 17;
          break;
        case 13:
          _context2.prev = 13;
          _context2.t0 = _context2["catch"](6);
          console.error("Error fetching products:", _context2.t0);
          res.status(500).json({
            error: "Internal server error"
          });
        case 17:
        case "end":
          return _context2.stop();
      }
    }, _callee2, null, [[6, 13]]);
  }));
  return function getProducts(_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}();
var getProductById = exports.getProductById = /*#__PURE__*/function () {
  var _ref3 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee3(req, res) {
    var product;
    return _regeneratorRuntime().wrap(function _callee3$(_context3) {
      while (1) switch (_context3.prev = _context3.next) {
        case 0:
          _context3.next = 2;
          return _Product["default"].findById(req.params.productId);
        case 2:
          product = _context3.sent;
          console.log(product);
          res.status(200).json(product);
        case 5:
        case "end":
          return _context3.stop();
      }
    }, _callee3);
  }));
  return function getProductById(_x5, _x6) {
    return _ref3.apply(this, arguments);
  };
}();
var updateProductById = exports.updateProductById = /*#__PURE__*/function () {
  var _ref4 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee4(req, res) {
    var id, existingProduct, categoryArray, categoryIds, pieces, newImgs, _iterator2, _step2, file, url, sharpenedBuffer, sharpenedUrl, savePath, existingImgs, existingImgsIds, updatedImgs, savedProduct;
    return _regeneratorRuntime().wrap(function _callee4$(_context4) {
      while (1) switch (_context4.prev = _context4.next) {
        case 0:
          id = req.params.productId;
          _context4.next = 3;
          return _Product["default"].findById(id);
        case 3:
          existingProduct = _context4.sent;
          categoryArray = req.body.category.split(",");
          categoryIds = categoryArray.map(function (id) {
            return mongoose.Types.ObjectId(id);
          });
          pieces = JSON.parse(req.body.pieces);
          if (existingProduct) {
            _context4.next = 9;
            break;
          }
          return _context4.abrupt("return", res.status(404).json({
            error: "Product not found"
          }));
        case 9:
          // Actualizar propiedades del producto
          existingProduct.name = req.body.name;
          existingProduct.price = req.body.price;
          existingProduct.description = req.body.description;
          existingProduct.category = categoryIds;
          existingProduct.stock = req.body.stock;
          existingProduct.garmentType = req.body.garmentType;
          existingProduct.pieces = pieces;
          existingProduct.reference = req.body.reference;
          newImgs = [];
          _iterator2 = _createForOfIteratorHelper(req.files);
          _context4.prev = 19;
          _iterator2.s();
        case 21:
          if ((_step2 = _iterator2.n()).done) {
            _context4.next = 41;
            break;
          }
          file = _step2.value;
          url = file.path.replace(/\\/g, "/");
          _context4.prev = 24;
          _context4.next = 27;
          return (0, _sharp["default"])(file.path).sharpen().toBuffer();
        case 27:
          sharpenedBuffer = _context4.sent;
          sharpenedUrl = "".concat(file.filename);
          savePath = _path["default"].join(__dirname, "path", "to", "save", sharpenedUrl);
          _fs["default"].mkdirSync(_path["default"].dirname(savePath), {
            recursive: true
          });
          _context4.next = 33;
          return (0, _sharp["default"])(sharpenedBuffer).toFile(savePath);
        case 33:
          newImgs.push({
            url: sharpenedUrl
          });
          _context4.next = 39;
          break;
        case 36:
          _context4.prev = 36;
          _context4.t0 = _context4["catch"](24);
          console.error("Error processing image:", _context4.t0);
        case 39:
          _context4.next = 21;
          break;
        case 41:
          _context4.next = 46;
          break;
        case 43:
          _context4.prev = 43;
          _context4.t1 = _context4["catch"](19);
          _iterator2.e(_context4.t1);
        case 46:
          _context4.prev = 46;
          _iterator2.f();
          return _context4.finish(46);
        case 49:
          existingImgs = req.body.existingImgs || [];
          existingImgsIds = existingProduct.imgs.map(function (img) {
            return img._id.toString();
          });
          updatedImgs = existingProduct.imgs.filter(function (img, index) {
            return existingImgs.includes(existingImgsIds[index]);
          });
          existingProduct.imgs = [].concat(_toConsumableArray(updatedImgs), newImgs);
          _context4.next = 55;
          return existingProduct.save();
        case 55:
          savedProduct = _context4.sent;
          res.status(200).json(savedProduct);
        case 57:
        case "end":
          return _context4.stop();
      }
    }, _callee4, null, [[19, 43, 46, 49], [24, 36]]);
  }));
  return function updateProductById(_x7, _x8) {
    return _ref4.apply(this, arguments);
  };
}();
var deleteProduct = exports.deleteProduct = /*#__PURE__*/function () {
  var _ref5 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee6(req, res) {
    var product;
    return _regeneratorRuntime().wrap(function _callee6$(_context6) {
      while (1) switch (_context6.prev = _context6.next) {
        case 0:
          _context6.prev = 0;
          _context6.next = 3;
          return _Product["default"].findById(req.params.productId);
        case 3:
          product = _context6.sent;
          product.imgs.forEach( /*#__PURE__*/function () {
            var _ref6 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee5(img) {
              var filePath;
              return _regeneratorRuntime().wrap(function _callee5$(_context5) {
                while (1) switch (_context5.prev = _context5.next) {
                  case 0:
                    try {
                      filePath = img.url.replace(/^.*[\\\/]/, "");
                      _fs["default"].unlinkSync("uploads/".concat(filePath)); // elimina archivo
                    } catch (err) {
                      console.error("Error deleting image ", err);
                    }
                  case 1:
                  case "end":
                    return _context5.stop();
                }
              }, _callee5);
            }));
            return function (_x11) {
              return _ref6.apply(this, arguments);
            };
          }());
          _context6.next = 7;
          return product.remove();
        case 7:
          res.json({
            message: "Product deleted"
          });
          _context6.next = 14;
          break;
        case 10:
          _context6.prev = 10;
          _context6.t0 = _context6["catch"](0);
          console.error(_context6.t0);
          res.status(500).json({
            message: "Server error"
          });
        case 14:
        case "end":
          return _context6.stop();
      }
    }, _callee6, null, [[0, 10]]);
  }));
  return function deleteProduct(_x9, _x10) {
    return _ref5.apply(this, arguments);
  };
}();