export const createBlog = (blogRepository) => {
    return async (blogData) => {
        try {
            return await blogRepository.createBlog(blogData);
        } catch (error) {
            return {
                success: false,
                message: error.message || "Error creating the blog"
            };
        }
    };
};