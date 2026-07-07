import { getAllJobs } from "../../../core/job/get-all-job.use-case.js";
import {getById} from "../../../core/job/get-by-id.use-case.js"
import { createJob } from "../../../core/job/create-job.use-case.js";
import { jobRepository } from "../../database/mongoose/repositories/job.repository.js";
import { updateJob } from "../../../core/job/update-job.user-case.js";
const getAllJobsUseCase = getAllJobs(jobRepository);
const getByIdUseCase = getById(jobRepository);
const createJobUseCase = createJob(jobRepository);
const updateJobUseCase = updateJob(jobRepository);

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

export const updateJobController = async(req, res)=>{
    try {
        const {id} = req.params;
        const updateData = req.body;
        const updatedJob = await updateJobUseCase(id, updateData);
        return res.json({success:true, data:updatedJob});
    } catch (error) {
        console.error("Error updating job:", error);
        res.status(500).json({ success: false, message: error.message });
    }
}