export const updateMainSection = (cmsRepository) => {
  return async(id, updateData) => {
    try {
      const mainSection = await cmsRepository.updateMainSection(id, updateData);
      return mainSection;
    } catch (error) {
      console.error("Error updating main section:", error);
      throw new Error("Error updating main section");
    }
  }
}
