import { registerUser, loginUser } from '../services/auth.service.js';

const register = async (req, res) => {
  try {
    await registerUser(req.body);
    res.status(201).json({ message: 'Usuario registrado correctamente' });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const login = async (req, res) => {
  try {
    const session = await loginUser(req.body);
    res.json(session );
  } catch (error) {
    res.status(401).json({ message: error.message });
  }
};

export { register, login };
