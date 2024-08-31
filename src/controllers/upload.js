const multer = require("multer");
const path = require('path');
const fs = require('fs');

// Obtener la ruta absoluta del directorio de uploads
const uploadDir = path.resolve(__dirname, '..', 'public', 'uploads');

// Crear el directorio si no existe
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadDir);
  },
  filename: function (req, file, cb) {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const multerConfig = {
  storage: storage,
  limits: { fileSize: 1000000 }, // 1MB
  fileFilter: (req, file, cb) => {
    // Filtros para tipos de archivo permitidos
    const allowedFileTypes = /jpeg|jpg|png/;
    const mimeType = allowedFileTypes.test(file.mimetype);
    const extname = allowedFileTypes.test(path.extname(file.originalname));
    
    if (mimeType && extname) {
      return cb(null, true);
    }
    cb("Solo se permiten archivos de imagen (JPEG/JPG/PNG)");
  },
};

const upload = multer(multerConfig);

const uploadArray = upload.array("imgs");

module.exports = uploadArray;
