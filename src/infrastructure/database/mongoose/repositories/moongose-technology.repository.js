import Technology from "../models/technology.model.js";

export const technologyRepository = {
  saveTechnology: (technologyData) => {
     console.log("xxdxd", technologyData)
    if (Array.isArray(technologyData)) {
      return Technology.insertMany(technologyData);
    }

    const technology = new Technology(technologyData);
    return technology.save();
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
  },
  replaceAllTechnologies: async (technologiesArray) => {
    const names = technologiesArray.map((t) => t.name);
    const operations = technologiesArray.map((t) => ({
      updateOne: {
        filter: { name: t.name },
        update: { $set: t },
        upsert: true,
      },
    }));
    if (operations.length > 0) {
      await Technology.bulkWrite(operations);
    }
    await Technology.deleteMany({ name: { $nin: names } });
    return Technology.find().exec();
  },
};
