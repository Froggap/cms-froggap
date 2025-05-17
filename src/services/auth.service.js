import jwt from 'jsonwebtoken';
import Auth from '../models/auth.model.js';

const registerUser = async ({ username, email, password }) => {
  const existingUser = await Auth.findOne({ $or: [{ email }, { username }] });
  if (existingUser) {
    throw new Error('Username o email ya registrados');
  }

  const user = new Auth({ username, email, password });
  await user.save(); // Ahora se guarda la instancia correctamente
  return user;
};

const loginUser = async ({ email, password, username }) => {
  try {

    const user = await Auth.findOne({ email, username });
    
    if (!user || !(await user.comparePassword(password))) {
      throw new Error('Credenciales inválidas');
    }

 
    const token = jwt.sign(
      { id: user._id, username: user.username, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: '2h' }  
    );

   
    return { token, username: user.username, email: user.email };
  } catch (error) {
   
    throw new Error(error.message);
  }
};
export { registerUser, loginUser };
