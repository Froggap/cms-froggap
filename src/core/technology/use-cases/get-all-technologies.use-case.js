export const getAllTechnologies = (technologyRepository) => {
  return async() => {
    try {
      const result = await technologyRepository.getAllTechnologies();
      return result;
    } catch (error) {
      console.error("Error getting all technologies:", error);
      throw new Error("Error getting all technologies");
    }
  }
}
