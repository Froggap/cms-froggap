export const updateJob = (jobRepository) => {
    return async (id, updateData) => {
        try {
            console.log("updateData", updateData);
            return jobRepository.updateJob(id, updateData);
        } catch (error) {
            return{
                success:false,
                message:error.message || "Error updating the job"
            }
        }
    }
}