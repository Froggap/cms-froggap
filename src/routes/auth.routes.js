import express from 'express';
import { register, login } from '../controllers/auth.controller.js';
import { loginLimiter } from '../middlewares/ratelimiter.middleware.js';

const router = express.Router();

// Ruta para registrar un usuario
router.post('/register', register);

// Ruta para login
router.post('/login', loginLimiter, login);

export default router;
