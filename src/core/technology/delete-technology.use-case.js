export const deleteTechnology = (technologyRepository) => {
  return async(id) => {
    try {
      const result = await technologyRepository.deleteTechnology(id);
      return result;
    } catch (error) {
      console.error("Error deleting technology:", error);
      throw new Error("Error deleting technology");
    }
  }
}
