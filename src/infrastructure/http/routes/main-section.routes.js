import  express from "express";
import { save, get, update, remove} from "../controllers/main-section.controller.js";
import { authMiddleware } from '../middlewares/auth.middleware.js';

const router = express.Router();

router.post('/save', authMiddleware, save);
router.get('/get', get);
router.put('/update/:id', authMiddleware, update);
router.delete('/delete/:id', authMiddleware, remove);

export default router;