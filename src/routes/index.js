import express from 'express';
import authRoutes from './auth.routes.js';
import accountRoutes from './account.routes.js';
import upload from '../middlewares/upload.js';
const router = express.Router();

router.use('/auth', authRoutes);
router.use('/account',upload.single('profileImage'), accountRoutes);

export default router;
