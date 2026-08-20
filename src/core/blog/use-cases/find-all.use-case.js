export const findAllBlogs = (blogRepository) => {
    return async () => {
        try {
            const blogs = await blogRepository.findAll();
            return blogs;
        }catch(error){
            return {
                success:false,
                message:error.message || "Error finding all blogs"
            }
        }
    }
}
