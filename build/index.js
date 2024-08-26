"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _express = _interopRequireDefault(require("express"));
var _morgan = _interopRequireDefault(require("morgan"));
require("./database.js");
var _package = _interopRequireDefault(require("../package.json"));
var _paymentRoutes = _interopRequireDefault(require("./routes/payment.routes.js"));
var _initialSetup = require("./libs/initialSetup.js");
var _productsRoutes = _interopRequireDefault(require("./routes/products.routes.js"));
var _slidersRoutes = _interopRequireDefault(require("./routes/sliders.routes.js"));
var _ordersRoutes = _interopRequireDefault(require("./routes/orders.routes.js"));
var _authRoutes = _interopRequireDefault(require("./routes/auth.routes.js"));
var _userRoutes = _interopRequireDefault(require("./routes/user.routes.js"));
var _categoryRoutes = _interopRequireDefault(require("./routes/category.routes.js"));
var _referencesRoutes = _interopRequireDefault(require("./routes/references.routes.js"));
var _garmentTypeRoutes = _interopRequireDefault(require("./routes/garmentType.routes.js"));
var _upload = _interopRequireDefault(require("./controllers/upload.js"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
var app = (0, _express["default"])();
var cors = require("cors");
// const cookieParser = require('cookie-parser');

(0, _initialSetup.createRoles)();
app.set("pkg", _package["default"]);
app.use(cors({
  origin: "*",
  // Reemplaza con la URL de tu cliente React
  credentials: true // las cookies
}));
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
app.use("/api/products", _productsRoutes["default"]);
app.use("/api/auth", _authRoutes["default"]);
app.use("/api/sliders", _slidersRoutes["default"]);
app.use("/api/garmentType", _garmentTypeRoutes["default"]);
app.use("/api/users", _userRoutes["default"]);
app.use("/api/categorys", _categoryRoutes["default"]);
app.use("/api/references", _referencesRoutes["default"]);
app.use("/api/uploads", _upload["default"]);
app.use("/api/payment", _paymentRoutes["default"]);
app.use("/api/orders", _ordersRoutes["default"]);

// app.listen(4000);
app.listen(3000);
console.log("server listen on port", 3000);
var _default = exports["default"] = app;