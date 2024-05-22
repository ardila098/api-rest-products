"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

var _morgan = _interopRequireDefault(require("morgan"));

var _package = _interopRequireDefault(require("../package.json"));

var _initialSetup = require("./libs/initialSetup");

var _auth = _interopRequireDefault(require("./routes/auth.routes"));

var _sentEmails = _interopRequireDefault(require("./routes/sentEmails.routes"));

var _user = _interopRequireDefault(require("./routes/user.routes"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var app = (0, _express["default"])();

var cors = require("cors");

(0, _initialSetup.createRoles)();
app.set("pkg", _package["default"]);
app.use(cors());
app.use((0, _morgan["default"])("dev"));
app.use(_express["default"].json());
app.get("/", function (req, res) {
  res.json({
    name: app.get("pkg").name,
    description: app.get("pkg").description
  });
});
app.use("/api/sentEmails", _sentEmails["default"]);
app.use("/api/auth", _auth["default"]);
app.use("/api/users", _user["default"]);
var _default = app;
exports["default"] = _default;