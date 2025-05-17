// import multer from 'multer';
// import { storage } from './cloudinaryConfig.js'; // Asegúrate que la ruta sea correcta

// // Configuración de multer con el almacenamiento de Cloudinary
// const upload = multer({ 
//   storage,
//   limits: { fileSize: 5 * 1024 * 1024 }, // Límite de 5MB
//   fileFilter: (req, file, cb) => {
//     // Validar tipos de archivo
//     if (file.mimetype.startsWith('image/')) {
//       cb(null, true);
//     } else {
//       cb(new Error('Solo se permiten imágenes'), false);
//     }
//   }
// });

// export default upload;
