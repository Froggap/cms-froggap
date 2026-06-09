import { getAllJobs } from "../../../core/job/getAllJob.use-case.js";
import {getById} from "../../../core/job/getById.use-case.js"
import { createJob } from "../../../core/job/createJob.use-case.js";
import { jobRepository } from "../../database/mongoose/repositories/job.repository.js";
const getAllJobsUseCase = getAllJobs(jobRepository);
const getByIdUseCase = getById(jobRepository);
const createJobUseCase = createJob(jobRepository);

export const getAllController = async(req, res) => {
    try {
        const jobs = await getAllJobsUseCase();
        return res.json({ success: true, data: jobs });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
}

export const getByIdController = async(req, res) => {
    try {
        const { id } = req.params;
        const job = await getByIdUseCase(id);
    }catch(error){
        console.error("Error getting job by ID:", error);
        res.status(500).json({ success: false, message: error.message });
    }
}

export const createJobController = async(req, res) => {
    try {
        const jobData = req.body;
        const newJob = await createJobUseCase(jobData);
        return res.json({ success: true, data: newJob });
    } catch (error) {
        console.error("Error creating job:", error);
        res.status(500).json({ success: false, message: error.message });
    }
}