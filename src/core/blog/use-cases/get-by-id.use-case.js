export const getBlogById = (blogRepository) => {
    return async (id) => {
        try {
            const blog = await blogRepository.findById(id);
            if (!blog) {
                throw new Error("Blog not found");
            }
            return blog;
        } catch (error) {
            return{
                success:false,
                message:error.message || "Error finding blog by id"
            }
        }
    }
}