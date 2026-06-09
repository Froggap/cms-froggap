import { technologyUseCase } from "../../../core/technology/save-technology.use-case.js";
import { deleteTechnology } from "../../../core/technology/delete-technology.use-case.js";
import { updateTechnology } from "../../../core/technology/update-technology.use-case.js";
import { getAllTechnologies } from "../../../core/technology/get-all-technologies.use-case.js";
import { getTechnologyById } from "../../../core/technology/get-technology-by-id.use-case.js";
import { technologyRepository } from "../../database/mongoose/repositories/moongose-technology.repository.js";

const saveTechnologyUseCase = technologyUseCase(technologyRepository);
const deleteTechnologyUseCase = deleteTechnology(technologyRepository);
const updateTechnologyUseCase = updateTechnology(technologyRepository);
const getAllTechnologiesUseCase = getAllTechnologies(technologyRepository);
const getTechnologyByIdUseCase = getTechnologyById(technologyRepository);

export const save = async(req , res)=>{
    try {
        const technology = await saveTechnologyUseCase(req.body);
        res.status(201).json({ success: true, data: technology });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
}

export const remove = async(req, res) => {
    try {
        const { id } = req.params;
        await deleteTechnologyUseCase(id);
        res.json({ success: true, message: "Technology deleted successfully" });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
}

export const update = async(req, res) => {
    try {
        const { id } = req.params;
        const result = await updateTechnologyUseCase(id, req.body);
        res.json({ success: true, message: "Technology updated successfully", data: result });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
}

export const getAll = async(req, res) => {
    try {
        const technologies = await getAllTechnologiesUseCase();
        res.json({ success: true, data: technologies });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
}

export const getById = async(req, res) => {
    try {
        const { id } = req.params;
        const technology = await getTechnologyByIdUseCase(id);
        if (!technology) {
            return res.status(404).json({ success: false, message: "Technology not found" });
        }
        res.json({ success: true, data: technology });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
}
