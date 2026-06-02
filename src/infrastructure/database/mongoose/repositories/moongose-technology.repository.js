import Technology from "../models/technology.model.js";

export const technologyRepository = {
    saveTechnology: (technologyData) => {
        const technology = new Technology(technologyData)
        return technology.save()
    }
}