import multer from 'multer';
import path from 'path';
import dotenv from 'dotenv';

dotenv.config();

let uploadDir;
if (process.env.NODE_ENV === 'production') {
  uploadDir = '/var/www/product-images/';
} else {
  uploadDir = path.join(__dirname, '../public', 'images');
}

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadDir);
  },
  filename: function (req, file, cb) {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({
  storage: storage,
  limits: { fileSize: 1000000 }, // 1MB
  fileFilter: (req, file, cb) => {
    const allowedFileTypes = /jpeg|jpg|png/;
    const mimeType = allowedFileTypes.test(file.mimetype);
    const extname = allowedFileTypes.test(path.extname(file.originalname));
    
    if (mimeType && extname) {
      return cb(null, true);
    }
    cb("Solo se permiten archivos de imagen (JPEG/JPG/PNG)");
  },
});

export default upload.array('imgs');
