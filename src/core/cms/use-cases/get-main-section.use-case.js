

export const getMainSection = (cmsRepository) => {
    return async() => {
        try {
            const mainSection = await cmsRepository.getMainSection();
            return mainSection;
        } catch (error) {
            console.error("Error getting main section:", error);
            throw new Error("Error getting main section");
        }
    }
}