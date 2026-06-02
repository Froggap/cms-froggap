import  express from "express";
import { save } from "../controllers/main-section.controller.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.post('/save', authMiddleware,save);

export default router;