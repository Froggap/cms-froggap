import express from 'express';
import authRoutes from './auth.routes.js';
import mainSectionRoutes from './main-section.routes.js';
import technologyRoutes from './technology.routes.js';
import jobRoutes from './job.routes.js';
import blogRoutes from './blog.route.js';
const router = express.Router();

router.use('/auth', authRoutes);
router.use('/mainSection', mainSectionRoutes);
router.use('/technology', technologyRoutes);
router.use('/job', jobRoutes);
router.use('/blog', blogRoutes);
export default router;
