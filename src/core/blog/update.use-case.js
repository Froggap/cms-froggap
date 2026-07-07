export const updateBlog = (blogRepository) => {
    return async (id, updateData) => {
        try {
            return await blogRepository.updateBlog(id, updateData);
        } catch (error) {
            return{
                success:false,
                message:error.message || "Error updating the blog"
            }
        }
    }
}