import express from 'express';
import { register, login, refresh, logout } from '../controllers/auth.controller.js';
import { loginLimiter } from '../middlewares/ratelimiter.middleware.js';

const router = express.Router();

router.post('/register', register);
router.post('/login', loginLimiter, login);
router.post('/refresh', refresh);
router.post('/logout', logout);

export default router;
