const multer = require("multer");
const path = require('path');

const uploadDir = path.join(__dirname, '../public/uploads');
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadDir);
  },
  filename: function (req, file, cb) {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const uploadConfig = {
  storage: storage,
  limits: { fileSize: 1000000 }, // 1MB
  fileFilter: (req, file, cb) => {
    const allowedTypes = ['image/jpeg', 'image/png', 'image/gif'];
    if (allowedTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error('Solo se permiten tipos de archivo JPEG, PNG o GIF'));
    }
  },
};

const uploadSingle = multer(uploadConfig).single('image');
const uploadMultiple = multer(uploadConfig).array('imgs');

module.exports = {
  uploadSingle,
  uploadMultiple,
};
