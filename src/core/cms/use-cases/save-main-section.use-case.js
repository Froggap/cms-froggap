export const saveMainSection = (cmsRepository) => {
  return async({title, name, rol, description}) => {
    try {
      const mainSection = await cmsRepository.saveMainSection({title, name, rol, description});
      return mainSection;
    } catch (error) {
      console.error("Error saving main section:", error);
      throw new Error("Error saving main section");
    }
  }
}
