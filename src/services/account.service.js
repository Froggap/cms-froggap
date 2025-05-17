import Account from '../models/account.model.js';

const createAccountsService = async (datos) => {
    const nuevaAccount = new Account(datos);
    return await nuevaAccount.save();
};

const getAllAccounts = async () => {
    const accounts = await Account.find();
    return accounts;
};

const getAccountByIdService = async (id) => {
    const account = await Account.findById(id);
    return account;
}

// const sendPhotoProfile =

export { createAccountsService, getAllAccounts, getAccountByIdService};