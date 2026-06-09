import rateLimit from 'express-rate-limit';

export const loginLimiter = rateLimit({
  windowMs: 1 * 60 * 1000, // 1 minutos
  max: 5, // máximo de 4 intentos
  message: 'Demasiados intentos de login. Intenta de nuevo más tarde.',
  standardHeaders: true, 
  legacyHeaders: false,
});
