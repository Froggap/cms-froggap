export const createLogoutUser = (authRepository, hashService) => {
  return async (refreshToken) => {
    if (!refreshToken) return;
    const hashedToken = hashService.hashToken(refreshToken);
    await authRepository.invalidateSession(hashedToken);
  };
};
