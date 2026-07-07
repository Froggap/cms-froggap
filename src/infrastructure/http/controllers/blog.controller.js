import { createBlog } from "../../../core/blog/create.use-case.js";
import { findAllBlogs } from "../../../core/blog/find-all.use-case.js";
import { blogRepository } from "../../database/mongoose/repositories/blog.repository.js";

const getAllBlogUseCase = findAllBlogs(blogRepository);
const createBlogUseCase = createBlog(blogRepository);


export const getAllBlogsController = async (req, res) => {
    try {
        const blogs = await getAllBlogUseCase();
        return res.json({ success: true, data: blogs });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
}

export const createBlogController = async (req, res) => {
    try {
        const blog = req.body;
        const newBlog = await createBlogUseCase(blog);
        return res.json({ success: true, data: newBlog });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
}