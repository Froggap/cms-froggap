// middlewares/upload.js
import multer from 'multer';

const storage = multer.memoryStorage(); // Guarda el archivo en memoria
const upload = multer({ storage });

export default upload;
