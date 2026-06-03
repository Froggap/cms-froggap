import express from "express";
import { save, remove, getAll, getById, update } from "../controllers/technology.controller.js";

const router = express.Router();

router.get('/all', getAll)
router.get('/:id', getById)
router.post('/save', save)
router.put('/update/:id', update)
router.delete('/delete/:id', remove)

export default router;