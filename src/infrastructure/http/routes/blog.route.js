import express from 'express';
import { createBlogController, getAllBlogsController, getBlogByIdController, updateBlogController } from '../controllers/blog.controller.js';
import { authMiddleware } from '../middlewares/auth.middleware.js';

const router = express.Router();

router.get('/', getAllBlogsController)
router.post('/create', authMiddleware, createBlogController)
router.get('/:id', getBlogByIdController)
router.patch('/:id', authMiddleware, updateBlogController)

export default router;
