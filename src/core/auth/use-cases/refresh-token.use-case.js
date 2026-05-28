export const createRefreshToken = (authRepository, tokenService, hashService) => {
  return async (refreshToken) => {
    if (!refreshToken) throw new Error('Refresh token requerido');

    const hashedToken = hashService.hashToken(refreshToken);
    
    const session = await authRepository.findValidSessionByToken(hashedToken);

    if (!session || !session.user) {
      throw new Error('Sesión inválida o expirada');
    }

    const accessToken = tokenService.generateAccessToken({ 
      id: session.user._id, 
      username: session.user.username, 
      email: session.user.email 
    });

    return { 
      accessToken, 
      user: {
        id: session.user._id,
        username: session.user.username, 
        email: session.user.email
      }
    };
  };
};
