export const createJob = (jobRepository) => {
    return async (newJob) => {
        try {
            const res = await jobRepository.createJob(newJob);
            return res;
            
        } catch (error) {
            console.log("Failed to create new job", error)
            return{
                success:false,
                message:"Failed to create new job"
            }
        }
    }
}
