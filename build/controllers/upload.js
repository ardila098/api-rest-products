"use strict";

var multer = require("multer");
var path = require('path');
var fs = require('fs');

// Obtener la ruta absoluta del directorio de uploads
var uploadDir = path.resolve(__dirname, '..', 'public', 'uploads');

// Crear el directorio si no existe
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, {
    recursive: true
  });
}
var storage = multer.diskStorage({
  destination: function destination(req, file, cb) {
    cb(null, uploadDir);
  },
  filename: function filename(req, file, cb) {
    cb(null, "".concat(Date.now(), "-").concat(file.originalname));
  }
});
var multerConfig = {
  storage: storage,
  limits: {
    fileSize: 1000000
  },
  // 1MB
  fileFilter: function fileFilter(req, file, cb) {
    // Filtros para tipos de archivo permitidos
    var allowedFileTypes = /jpeg|jpg|png/;
    var mimeType = allowedFileTypes.test(file.mimetype);
    var extname = allowedFileTypes.test(path.extname(file.originalname));
    if (mimeType && extname) {
      return cb(null, true);
    }
    cb("Solo se permiten archivos de imagen (JPEG/JPG/PNG)");
  }
};
var upload = multer(multerConfig);
var uploadArray = upload.array("imgs");
module.exports = uploadArray;