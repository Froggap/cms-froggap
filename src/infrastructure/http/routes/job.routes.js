import express from 'express';
import { getAllController,getByIdController, createJobController } from '../../../infrastructure/http/controllers/job.controller.js';

const router = express.Router();

router.get('/getAll', getAllController);
router.get('/:id', getByIdController);
router.post('/save', createJobController)
export default router;