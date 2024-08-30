"use strict";

// upload.js

var multer = require("multer");
var storage = multer.diskStorage({
  destination: function destination(req, file, cb) {
    cb(null, "../public/uploads");
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
    // filters

    cb(null, true);
  }
};
var upload = multer(multerConfig);
var uploadArray = upload.array("imgs");
module.exports = uploadArray;