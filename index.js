import 'dotenv/config';
import app from './src/app.js';
import connectDB from './src/config/db.js';
import mongoose from 'mongoose';



const PORT = process.env.PORT || 3000;

connectDB()
  .then(() => {
    const server = app.listen(PORT, () => {
      console.log(`Servidor corriendo en http://localhost:${PORT}`);
    });

    server.on('error', (error) => {
      if (error.code === 'EADDRINUSE') {
        console.error(`El puerto ${PORT} ya está ocupado`);
      } else {
        console.error('Error al iniciar el servidor:', error);
      }
      process.exit(1);
    });

    // Maneajador cierres inesperados de manera limpia 
    const gracefulShutdown = (signal) => {
      console.log(`\n Recibido ${signal}. Cerrando servidor...`);
      server.close(async() => {
        console.log(' Servidor Express cerrado.');
        await mongoose.connection.close();
        console.log(' Conexión a MongoDB cerrada.');
        process.exit(0);
      });
    };

    process.on('SIGTERM', () => gracefulShutdown('SIGTERM'));
    process.on('SIGINT', () => gracefulShutdown('SIGINT'));
  })
  .catch((error) => {
    console.error('Error fatal al iniciar la aplicación:', error);
    process.exit(1);
  });

// Capturar errores no controlados a nivel de proceso
process.on('unhandledRejection', (reason, promise) => {
  console.error(' Promesa rechazada no controlada:', promise, 'razón:', reason);
});

process.on('uncaughtException', (error) => {
  console.error('Excepción no controlada:', error);
  process.exit(1);
});
