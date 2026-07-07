export const technologyUseCase = (cmsRepository) => {
    return async (technologyData) => {
        try {
            const technology = await cmsRepository.saveTechnology(technologyData);
            return technology;
        } catch (error) {
            console.error('Error saving technology:', error);
            throw new Error("Error saving technology");
        }
    }
}