import express from 'express';
import { createBlogController, getAllBlogsController, getBlogByIdController, updateBlogController } from '../controllers/blog.controller.js';

const router = express.Router();

router.get('/', getAllBlogsController)
router.post('/create', createBlogController)
router.get('/:id', getBlogByIdController)
router.patch('/:id', updateBlogController)

export default router;