import { Router } from 'express';
import { createAccountsController,getAllAccountsController,getAccountByIdController,updateAccountByIdController } from '../controllers/account.controller.js';
import accountValidator from '../validator/account.validator.js';
import { authMiddleware } from '../middlewares/auth.middleware.js';



const router = Router();
router.post('/post',authMiddleware,accountValidator,createAccountsController);
router.get('/getAll',getAllAccountsController);
router.get('/get/:id',authMiddleware,getAccountByIdController);
router.post('/sendphoto',authMiddleware);
router.patch('/update/:id',authMiddleware, updateAccountByIdController);

export default router;