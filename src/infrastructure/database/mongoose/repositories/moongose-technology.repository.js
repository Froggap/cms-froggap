import Technology from "../models/technology.model.js";

export const technologyRepository = {
    saveTechnology: (technologyData) => {
        const technology = new Technology(technologyData)
        return technology.save()
    },
    deleteTechnology: (id) => {
        return Technology.findByIdAndDelete(id).exec();
    },
    updateTechnology: (id, updateData) => {
        return Technology.findByIdAndUpdate(id, updateData, { new: true }).exec();
    },
    getAllTechnologies: () => {
        return Technology.find().exec();
    },
    getTechnologyById: (id) => {
        return Technology.findById(id).exec();
    }
}