export const updateTechnology = (technologyRepository) => {
  return async(id, updateData) => {
    try {
      const result = await technologyRepository.updateTechnology(id, updateData);
      return result;
    } catch (error) {
      console.error("Error updating technology:", error);
      throw new Error("Error updating technology");
    }
  }
}
