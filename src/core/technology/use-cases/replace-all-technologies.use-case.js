export const replaceAllTechnologies = (technologyRepository) => {
  return async (technologiesArray) => {
    try {
      const result = await technologyRepository.replaceAllTechnologies(technologiesArray);
      return result;
    } catch (error) {
      console.error("Error replacing technologies:", error);
      throw new Error("Error replacing technologies");
    }
  };
};
