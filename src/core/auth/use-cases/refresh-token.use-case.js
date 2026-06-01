export const createRefreshToken = (authRepository, tokenService, hashService) => {
  return async (oldRefreshToken, { ipAddress, userAgent }) => {
    if (!oldRefreshToken) throw new Error('Refresh token requerido');

    const oldHashedToken = hashService.hashToken(oldRefreshToken);
    const session = await authRepository.findValidSessionByToken(oldHashedToken);

    if (!session || !session.user) {
      throw new Error('Sesión inválida o expirada');
    }

    await authRepository.invalidateSession(oldHashedToken);

    const accessToken = tokenService.generateAccessToken({ 
      id: session.user._id, 
      username: session.user.username, 
      email: session.user.email 
    });

    const newRawRefreshToken = hashService.generateRandomToken();
    const newHashedRefreshToken = hashService.hashToken(newRawRefreshToken);

    await authRepository.createSession({
      user: session.user._id,
      refreshToken: newHashedRefreshToken,
      ipAddress,
      userAgent,
      expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
    });

    return { 
      accessToken, 
      refreshToken: newRawRefreshToken,
      user: {
        id: session.user._id,
        username: session.user.username, 
        email: session.user.email
      }
    };
  };
};
