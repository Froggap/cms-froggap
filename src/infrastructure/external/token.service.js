import jwt from 'jsonwebtoken';

export const tokenService = {
  generateAccessToken: (payload) => {
    return jwt.sign(
      payload,
      process.env.JWT_SECRET,
      { expiresIn: '15m' }
    );
  },
  
  verifyToken: (token) => {
    return jwt.verify(token, process.env.JWT_SECRET);
  }
};
