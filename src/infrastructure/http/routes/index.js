import express from 'express';
import authRoutes from './auth.routes.js';
import mainSectionRoutes from './main-section.routes.js';
import technologyRoutes from './technology.routes.js';
import { authMiddleware } from '../middlewares/auth.middleware.js';

const router = express.Router();

router.use('/auth', authRoutes);
router.use('/mainSection', authMiddleware, mainSectionRoutes);
router.use('/technology', authMiddleware, technologyRoutes);

export default router;
