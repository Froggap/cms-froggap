import Job from "../models/job.model.js";

export const jobRepository = {
    findAll: () => {
        return Job.find({ active: true }).exec();
    },
    findById:(id) => {
        return Job.findById(id).exec();
    },
    updateJob:(id, data) => {
        return Job.findByIdAndUpdate(id, data, { new: true }).exec();
    },
    deleteJob:(id) => {
        return Job.findByIdAndDelete(id).exec();
    },
    createJob:(data) => {
        const job = new Job(data);
        return job.save();
    }
}