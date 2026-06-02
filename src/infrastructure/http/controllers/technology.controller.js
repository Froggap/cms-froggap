import { technologyUseCase } from "../../../core/cms/use-cases/save-technology.use-case.js";
import { technologyRepository } from "../../database/mongoose/repositories/moongose-technology.repository.js";

const saveTechnology = technologyUseCase(technologyRepository);

export const technologyController = async(req , res)=>{
    try {
        const technology = await saveTechnology(req.body);
        res.status(201).json({ success: true, data: technology });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
}