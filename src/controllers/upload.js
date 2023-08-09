// upload.js

const multer = require("multer");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads");
  },
  filename: function (req, file, cb) {
   cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const multerConfig = {
  storage: storage,
  limits: { fileSize: 1000000 }, // 1MB
  fileFilter: (req, file, cb) => {
    // filters

    cb(null, true);
  }
}

const upload = multer(multerConfig);

const uploadArray = upload.array("imgs");

module.exports = uploadArray;