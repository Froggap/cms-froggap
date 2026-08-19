import { technologyUseCase } from "../../../core/technology/use-cases/save-technology.use-case.js";
import { deleteTechnology } from "../../../core/technology/use-cases/delete-technology.use-case.js";
import { replaceAllTechnologies } from "../../../core/technology/use-cases/replace-all-technologies.use-case.js";
import { getAllTechnologies } from "../../../core/technology/use-cases/get-all-technologies.use-case.js";
import { getTechnologyById } from "../../../core/technology/use-cases/get-technology-by-id.use-case.js";
import { technologyRepository } from "../../database/mongoose/repositories/moongose-technology.repository.js";

const saveTechnologyUseCase = technologyUseCase(technologyRepository);
const deleteTechnologyUseCase = deleteTechnology(technologyRepository);
const replaceAllTechnologiesUseCase = replaceAllTechnologies(technologyRepository);
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
        const technologiesArray = req.body;
        if (!Array.isArray(technologiesArray)) {
            return res.status(400).json({ success: false, message: "Body must be an array of technologies" });
        }
        const result = await replaceAllTechnologiesUseCase(technologiesArray);
        res.json({ success: true, message: "Technologies replaced successfully", data: result });
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
