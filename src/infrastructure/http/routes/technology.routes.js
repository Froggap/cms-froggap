import express from "express";
import { save, remove, getAll, getById, update } from "../controllers/technology.controller.js";
import { authMiddleware } from '../middlewares/auth.middleware.js';

const router = express.Router();

router.get('/all', getAll)
router.get('/:id', getById)
router.post('/save', authMiddleware, save)
router.put('/update', authMiddleware, update)
router.delete('/delete/:id', authMiddleware, remove)

export default router;