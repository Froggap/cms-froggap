import Job  from "../models/job.model.js";

export const jobRepository= {
    findAll: async () => {
        return await Job.find({active:true})
    },
    findById: async (id) => {
        return await Job.findById(id)
    },
    updateJob: async (id, data) => {
        return await Job.findByIdAndUpdate(id, data, { new: true })
    },
    deleteJob: async (id) => {
        return await Job.findByIdAndDelete(id)
    },
    createJob: async (data) => {
        const job = new Job(data);
        return await job.save();
    }
}