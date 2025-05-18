import { validationResult } from 'express-validator';
import { createAccountsService, getAllAccounts, getAccountByIdService,updateAccountByIdService } from '../services/account.service.js';
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
    if(!account) return;

    const newAccount = await createAccountsService(account);

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
    const account = await updateAccountByIdService(req.params.id,req.body);
    res.json(account);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}

export { createAccountsController, getAllAccountsController, getAccountByIdController, updateAccountByIdController };