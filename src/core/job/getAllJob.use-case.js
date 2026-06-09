export const getAllJobs = (JobModel) => {
    return async () => {
        try {
            return await JobModel.findAll();
        } catch (error) {
            console.error("Error getting all jobs:", error);
            return {
                success: false,
                message: "Error getting all jobs",
            };
        }
    }

}