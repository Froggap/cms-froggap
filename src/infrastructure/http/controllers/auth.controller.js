import { mongooseAuthRepository } from '../../database/mongoose/repositories/mongoose-auth.repository.js';
import { hashService } from '../../external/hash.service.js';
import { tokenService } from '../../external/token.service.js';

import { createRegisterUser } from '../../../core/auth/use-cases/register.use-case.js';
import { createLoginUser } from '../../../core/auth/use-cases/login.use-case.js';
import { createRefreshToken } from '../../../core/auth/use-cases/refresh-token.use-case.js';
import { createLogoutUser } from '../../../core/auth/use-cases/logout.use-case.js';

// Injecting dependencies into use cases
const registerUser = createRegisterUser(mongooseAuthRepository);
const loginUser = createLoginUser(mongooseAuthRepository, hashService, tokenService);
const refreshAccessToken = createRefreshToken(mongooseAuthRepository, tokenService, hashService);
const logoutUser = createLogoutUser(mongooseAuthRepository, hashService);

export const register = async (req, res) => {
  try {
    const user = await registerUser(req.body);
    res.status(201).json({ 
      success: true,
      message: 'Usuario registrado correctamente',
      data: { id: user._id, username: user.username, email: user.email }
    });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const ipAddress = req.ip;
    const userAgent = req.headers['user-agent'];

    const session = await loginUser({ email, password, ipAddress, userAgent });
  
    if(session.refreshToken) {
      res.cookie('refreshToken', session.refreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        path: '/',
        maxAge: 7 * 24 * 60 * 60 * 1000,
      });
    }

    res.json({
      success: true,
      data: {
        accessToken: session.accessToken,
        user: session.user
      }
    });
  } catch (error) {
    res.status(401).json({ success: false, message: error.message });
  }
};

export const refresh = async (req, res) => {
  try {
    const { refreshToken } = req.cookies;
    const ipAddress = req.ip;
    const userAgent = req.headers['user-agent'];

    const result = await refreshAccessToken(refreshToken, { ipAddress, userAgent });

    res.cookie('refreshToken', result.refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    res.json({
      success: true,
      data: {
        accessToken: result.accessToken,
        user: result.user
      }
    });
  } catch (error) {
    res.status(401).json({ success: false, message: error.message });
  }
};

export const logout = async (req, res) => {
  try {
    const { refreshToken } = req.cookies;
    await logoutUser(refreshToken);
    
    res.clearCookie('refreshToken', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
    });

    res.json({
      success: true,
      message: 'Sesión cerrada correctamente'
    });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};
