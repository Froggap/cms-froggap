import Blog from "../models/blog.model.js";


export const blogRepository = {
    findAll:()=>{
        return Blog.find({active:true}).exec();
    },
    findById: (id)=>{
        return Blog.findById(id).exec();
    },
    createBlog: (data)=>{
        const blog = new Blog(data);
        return blog.save();
    },
    updateBlog: (id, data)=>{
        return Blog.findByIdAndUpdate(id, data, {new:true}).exec();
    },
}