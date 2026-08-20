import express from 'express';
import { getAllController,getByIdController, createJobController } from '../../../infrastructure/http/controllers/job.controller.js';
import { authMiddleware } from '../middlewares/auth.middleware.js';

const router = express.Router();

router.get('/getAll', getAllController);
router.get('/:id', getByIdController);
router.post('/save', authMiddleware, createJobController)
export default router;