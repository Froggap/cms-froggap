import Account from '../models/account.model.js';
import cloudinary from '../utils/cloudinary.js';
const createAccountsService = async (datos) => {

    let imageUrl = null;

    if (datos.profileImage?.startsWith('data:image')) {
        // Extraemos la parte base64 limpia
        const base64Str = datos.profileImage.split(';base64,').pop();

        // Subimos la imagen a Cloudinary usando la función uploader.upload con base64
        const uploadResult = await cloudinary.uploader.upload(`data:image/jpeg;base64,${base64Str}`, {
            folder: 'profiles',
        });

        imageUrl = uploadResult.secure_url;
        console.log("Image uploaded successfully:", imageUrl);
    }

    const accountData = {
        ...datos,
        profileImage: imageUrl,
    };

    const nuevaAccount = new Account(accountData);
    await nuevaAccount.save();

    return nuevaAccount;

};


const getAllAccounts = async () => {
    const accounts = await Account.find();
    return accounts;
};

const getAccountByIdService = async (id) => {
    const account = await Account.findById(id);
    return account;
}

const updateAccountByIdService = async (id, datos) => {
    const account = await Account.findByIdAndUpdate(id, datos);
    return account;
}

export { createAccountsService, getAllAccounts, getAccountByIdService, updateAccountByIdService };