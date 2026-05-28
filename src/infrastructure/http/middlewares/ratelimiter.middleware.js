import rateLimit from 'express-rate-limit';

export const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutos
  max: 5, // máximo de 4 intentos
  message: 'Demasiados intentos de login. Intenta de nuevo más tarde.',
  standardHeaders: true, 
  legacyHeaders: false,
});
