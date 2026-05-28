export const createLoginUser = (authRepository, hashService, tokenService) => {
  return async ({ email, password, ipAddress, userAgent }) => {
    const user = await authRepository.findByEmail(email);
    
    if (!user || !(await user.comparePassword(password))) {
      throw new Error('Credenciales inválidas');
    }

    const accessToken = tokenService.generateAccessToken({ 
      id: user._id, 
      username: user.username, 
      email: user.email 
    });

    const rawRefreshToken = hashService.generateRandomToken();
    const hashedRefreshToken = hashService.hashToken(rawRefreshToken);

    await authRepository.createSession({
      user: user._id,
      refreshToken: hashedRefreshToken,
      ipAddress,
      userAgent,
      expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
    });

    return { 
      accessToken, 
      refreshToken: rawRefreshToken,
      user: {
        id: user._id,
        username: user.username, 
        email: user.email 
      }
    };
  };
};
