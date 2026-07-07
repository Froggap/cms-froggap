export const getById=(jobRepository)=>{
    return async(id)=>{
        try {
            return await jobRepository.findById(id);        
        } catch (error) {
            console.log("error getting the job", error);

            return {
                success:false,
                message:"Error getting the job"
            }
        }
    }

}