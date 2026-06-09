import express from 'express';
import morgan from 'morgan';
import routes from './infrastructure/http/routes/index.js';
import cors from 'cors';
import { corsOptions } from './config/cors.js';
import cookieParser from 'cookie-parser';

const app = express();

app.use(morgan('dev'));

// Configuración de Middlewares globales
app.use(cookieParser());
app.use(cors(corsOptions));
app.use(express.json({ limit: '10mb' })); 
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Definición de Rutas
app.use('/api/v1', routes); 

// Manejador para rutas 404 (No Encontradas)
app.use((req, res, _next) => {
  res.status(404).json({
    success: false,
    error: 'Ruta no encontrada',
    path: req.originalUrl,
  });
});


app.use((err, req, res, _next) => {
  console.error('Error no manejado en la petición:', err);
  
  const statusCode = err.statusCode || err.status || 500;
  const message = err.message || 'Error interno del servidor';

  res.status(statusCode).json({
    success: false,
    error: message,
    // Solo enviamos la traza en ambiente de desarrollo
    stack: process.env.NODE_ENV === 'development' ? err.stack : undefined,
  });
});

export default app;



