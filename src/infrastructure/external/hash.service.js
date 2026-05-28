import bcrypt from 'bcryptjs';
import crypto from 'crypto';

export const hashService = {
  hashPassword: (password) => bcrypt.hash(password, 10),
  comparePassword: (password, hash) => bcrypt.compare(password, hash),
  
  generateRandomToken: () => crypto.randomBytes(40).toString('hex'),
  
  hashToken: (token) => {
    return crypto.createHash('sha256').update(token).digest('hex');
  }
};
