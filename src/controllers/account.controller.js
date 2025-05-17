import { validationResult } from 'express-validator';
import { createAccountsService, getAllAccounts, getAccountByIdService } from '../services/account.service.js';
import cloudinary from '../utils/cloudinary.js';

const createAccountsController = async (req, res) => {
  try {

    // Validación de errores
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      console.error('❌ Errores de validación:', errors.array());
      return res.status(400).json({ errors: errors.array() });
    }

    const account = req.body;
    let imageUrl = null;

    if (account.profileImage && account.profileImage.startsWith('data:image')) {
      // Extraemos la parte base64 limpia
      const base64Str = account.profileImage.split(';base64,').pop();

      // Subimos a Cloudinary usando la función uploader.upload con base64
      const uploadResult = await cloudinary.uploader.upload(`data:image/jpeg;base64,${base64Str}`, {
        folder: 'profiles'
      });

      imageUrl = uploadResult.secure_url;
    }

    const accountData = {
      ...account,
      profileImage: imageUrl,
    };

    const newAccount = await createAccountsService(accountData);

    res.status(201).json({ message: 'Cuenta creada', account: newAccount });
  } catch (error) {
    console.error('❌ Error en el controlador:', error.message);
    res.status(400).json({ error: error.message });
  }
};




const getAllAccountsController = async (req, res) => {
  try {
    const accounts = await getAllAccounts();
    res.json(accounts);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}

const getAccountByIdController = async (req, res) => {

  try {
    const account = await getAccountByIdService(req.params.id);
    res.json(account);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}

const updateAccountByIdController = async (req, res) => {
  try {

  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}

export { createAccountsController, getAllAccountsController, getAccountByIdController };