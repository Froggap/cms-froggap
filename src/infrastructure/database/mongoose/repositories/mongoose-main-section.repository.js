import MainSection from "../models/main-section.model.js";

export const cmsRepository = {
  saveMainSection: (cmsData) => {
    const mainSection = new MainSection(cmsData)
    return mainSection.save()
  }
}
