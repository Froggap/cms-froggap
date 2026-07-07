export const deleteMainSection = (cmsRepository) => {
  return async(id) => {
    try {
      const result = await cmsRepository.deleteMainSection(id);
      return result;
    } catch (error) {
      console.error("Error deleting main section:", error);
      throw new Error("Error deleting main section");
    }
  }
}
