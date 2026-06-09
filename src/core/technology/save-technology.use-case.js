export const technologyUseCase = (cmsRepository) => {
    return async ({name, technologies, tags}) => {
        try {
            const technology = await cmsRepository.saveTechnology({name, technologies, tags});
            return technology;
        } catch (error) {
            console.error('Error saving technology:', error);
            throw new Error("Error saving technology");
        }
    }
}