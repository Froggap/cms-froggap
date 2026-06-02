import express from "express";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import { technologyController } from "../controllers/technology.controller.js";

const router = express.Router();

router.post('/save', technologyController)

export default router;