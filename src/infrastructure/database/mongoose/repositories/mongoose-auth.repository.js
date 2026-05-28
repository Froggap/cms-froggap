import User from '../models/user.model.js';
import Session from '../models/session.model.js';

export const mongooseAuthRepository = {
  findByEmailOrUsername: (email, username) => {
    return User.findOne({ $or: [{ email }, { username }] });
  },

  findByEmail: (email) => {
    return User.findOne({ email });
  },

  saveUser: (userData) => {
    const user = new User(userData);
    return user.save();
  },

  createSession: (sessionData) => {
    return Session.create(sessionData);
  },

  findValidSessionByToken: (hashedToken) => {
    return Session.findOne({ 
      refreshToken: hashedToken,
      isValid: true,
      expiresAt: { $gt: new Date() }
    }).populate('user');
  },

  invalidateSession: (hashedToken) => {
    return Session.findOneAndUpdate(
      { refreshToken: hashedToken }, 
      { isValid: false }
    );
  }
};
