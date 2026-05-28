export const createRegisterUser = (authRepository) => {
  return async ({ username, email, password }) => {
    const existingUser = await authRepository.findByEmailOrUsername(email, username);
    if (existingUser) {
      throw new Error('Username o email ya registrados');
    }

    return authRepository.saveUser({ username, email, password });
  };
};
