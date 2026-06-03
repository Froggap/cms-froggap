import MainSection from "../models/main-section.model.js";

export const cmsRepository = {
  saveMainSection: (cmsData) => {
    const mainSection = new MainSection(cmsData)
    return mainSection.save()
  },
  getMainSection: () => {
    return MainSection.findOne().sort({createdAt: -1}).exec();
  },
  updateMainSection: (id, updateData) => {
    return MainSection.findByIdAndUpdate(id, updateData, { new: true }).exec();
  },
  deleteMainSection: (id) => {
    return MainSection.findByIdAndDelete(id).exec();
  }
}
