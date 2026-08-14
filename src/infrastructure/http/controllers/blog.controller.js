import { createBlog } from "../../../core/blog/use-cases/create.use-case.js";
import { findAllBlogs } from "../../../core/blog/use-cases/find-all.use-case.js";
import { getBlogById } from "../../../core/blog/use-cases/get-by-id.use-case.js";
import { blogRepository } from "../../database/mongoose/repositories/blog.repository.js";
import { updateBlog } from "../../../core/blog/use-cases/update.use-case.js";

const getAllBlogUseCase = findAllBlogs(blogRepository);
const createBlogUseCase = createBlog(blogRepository);
const getBlogByIdUseCase = getBlogById(blogRepository);
const updateBlogUseCase = updateBlog(blogRepository);


export const getAllBlogsController = async (req, res) => {
    try {
        const blogs = await getAllBlogUseCase();
        return res.json({ success: true, data: blogs });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
}

export const getBlogByIdController = async (req, res) => {
    try {
        const { id } = req.params;
        const blog = await getBlogByIdUseCase(id);
        return res.json({ success: true, data: blog });
    }catch(error){
        res.status(500).json({ success: false, message: error.message });
    }
}

export const updateBlogController = async (req, res) => {
    try {
        const blog = req.body;
        const { id } = req.params;
        const updatedBlog = await updateBlogUseCase(id, blog);
        return res.json({ success: true, data: updatedBlog });
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