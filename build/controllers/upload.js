"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _multer = _interopRequireDefault(require("multer"));
var _path = _interopRequireDefault(require("path"));
var _dotenv = _interopRequireDefault(require("dotenv"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
_dotenv["default"].config();
var uploadDir = "/var/www/product-images/";

// uploadDir = path.join(__dirname, '../public', 'images');

var storage = _multer["default"].diskStorage({
  destination: function destination(req, file, cb) {
    cb(null, uploadDir);
  },
  filename: function filename(req, file, cb) {
    cb(null, "".concat(Date.now(), "-").concat(file.originalname));
  }
});
var upload = (0, _multer["default"])({
  storage: storage,
  limits: {
    fileSize: 1000000
  },
  // 1MB
  fileFilter: function fileFilter(req, file, cb) {
    var allowedFileTypes = /jpeg|jpg|png/;
    var mimeType = allowedFileTypes.test(file.mimetype);
    var extname = allowedFileTypes.test(_path["default"].extname(file.originalname));
    if (mimeType && extname) {
      return cb(null, true);
    }
    cb("Solo se permiten archivos de imagen (JPEG/JPG/PNG)");
  }
});
var _default = exports["default"] = upload.array("imgs");