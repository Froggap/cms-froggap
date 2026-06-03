export const getTechnologyById = (technologyRepository) => {
  return async(id) => {
    try {
      const result = await technologyRepository.getTechnologyById(id);
      return result;
    } catch (error) {
      console.error("Error getting technology by id:", error);
      throw new Error("Error getting technology by id");
    }
  }
}
