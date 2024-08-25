"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _express = _interopRequireDefault(require("express"));
var _morgan = _interopRequireDefault(require("morgan"));
var _package = _interopRequireDefault(require("../package.json"));
var _paymentRoutes = _interopRequireDefault(require("./routes/payment.routes.js"));
var _initialSetup = require("./libs/initialSetup");
var _products = _interopRequireDefault(require("./routes/products.routes"));
var _sliders = _interopRequireDefault(require("./routes/sliders.routes"));
var _ordersRoutes = _interopRequireDefault(require("./routes/orders.routes.js"));
var _auth = _interopRequireDefault(require("./routes/auth.routes"));
var _user = _interopRequireDefault(require("./routes/user.routes"));
var _category = _interopRequireDefault(require("./routes/category.routes"));
var _references = _interopRequireDefault(require("./routes/references.routes"));
var _garmentType = _interopRequireDefault(require("./routes/garmentType.routes"));
var _upload = _interopRequireDefault(require("./controllers/upload"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
var app = (0, _express["default"])();
var cors = require("cors");
// const cookieParser = require('cookie-parser');

(0, _initialSetup.createRoles)();
app.set("pkg", _package["default"]);
app.use(cors());
// app.use(cookieParser());
app.use((0, _morgan["default"])("dev"));
app.use(_express["default"].json());
app.get("/", function (req, res) {
  res.json({
    name: app.get("pkg").name,
    description: app.get("pkg").description
  });
});
app.use("/uploads", _express["default"]["static"]("uploads"));
app.use("/api/products", _products["default"]);
app.use("/api/auth", _auth["default"]);
app.use("/api/sliders", _sliders["default"]);
app.use("/api/garmentType", _garmentType["default"]);
app.use("/api/users", _user["default"]);
app.use("/api/categorys", _category["default"]);
app.use("/api/references", _references["default"]);
app.use("/api/uploads", _upload["default"]);
app.use("/api/payment", _paymentRoutes["default"]);
app.use("/api/orders", _ordersRoutes["default"]);
var _default = exports["default"] = app;