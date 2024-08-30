"use strict";

var multer = require("multer");
var path = require('path');
var uploadDir = path.join(__dirname, '../public/uploads');
var storage = multer.diskStorage({
  destination: function destination(req, file, cb) {
    cb(null, uploadDir);
  },
  filename: function filename(req, file, cb) {
    cb(null, "".concat(Date.now(), "-").concat(file.originalname));
  }
});
var uploadConfig = {
  storage: storage,
  limits: {
    fileSize: 1000000
  },
  // 1MB
  fileFilter: function fileFilter(req, file, cb) {
    var allowedTypes = ['image/jpeg', 'image/png', 'image/gif'];
    if (allowedTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error('Solo se permiten tipos de archivo JPEG, PNG o GIF'));
    }
  }
};
var uploadSingle = multer(uploadConfig).single('image');
var uploadMultiple = multer(uploadConfig).array('imgs');
module.exports = {
  uploadSingle: uploadSingle,
  uploadMultiple: uploadMultiple
};