import express from 'express';
import { createBlogController, getAllBlogsController } from '../controllers/blog.controller.js';

const router = express.Router();

router.get('/', getAllBlogsController)
router.post('/create', createBlogController)

export default router;