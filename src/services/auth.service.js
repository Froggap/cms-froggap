import jwt from 'jsonwebtoken';
import crypto from 'crypto';
import User from '../models/user.model.js';
import Session from '../models/session.model.js';

/**
 * Genera un hash SHA-256 de un token para almacenamiento seguro
 */
const hashToken = (token) => {
  return crypto.createHash('sha256').update(token).digest('hex');
};

const registerUser = async ({ username, email, password }) => {
  const existingUser = await User.findOne({ $or: [{ email }, { username }] });
  if (existingUser) {
    throw new Error('Username o email ya registrados');
  }

  const user = new User({ username, email, password });
  await user.save();
  return user;
};

const loginUser = async ({ email, password, ipAddress, userAgent }) => {
  const user = await User.findOne({ email });
  
  if (!user || !(await user.comparePassword(password))) {
    throw new Error('Credenciales inválidas');
  }

  const accessToken = jwt.sign(
    { id: user._id, username: user.username, email: user.email },
    process.env.JWT_SECRET,
    { expiresIn: '15m' }  
  );

  const rawRefreshToken = crypto.randomBytes(40).toString('hex');
  const hashedRefreshToken = hashToken(rawRefreshToken);

  // Guardar sesión hasheada
  await Session.create({
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

const refreshAccessToken = async (refreshToken) => {
  if (!refreshToken) throw new Error('Refresh token requerido');

  const hashedToken = hashToken(refreshToken);
  
  const session = await Session.findOne({ 
    refreshToken: hashedToken,
     isValid: true, // filter
    expiresAt: { $gt: new Date() } //gt = greater than
  }).populate('user');

  if (!session || !session.user) {
    throw new Error('Sesión inválida o expirada');
  }

  const accessToken = jwt.sign(
    { id: session.user._id, username: session.user.username, email: session.user.email },
    process.env.JWT_SECRET,
    { expiresIn: '15m' }
  );

  return { accessToken, user:{
    id: session.user._id,
    username: session.user.username, 
    email: session.user.email
  }};
};

const logoutUser = async (refreshToken) => {
  if (!refreshToken) return;
  const hashedToken = hashToken(refreshToken);
  await Session.findOneAndUpdate({ refreshToken: hashedToken }, { isValid: false });
};

export { registerUser, loginUser, refreshAccessToken, logoutUser };
