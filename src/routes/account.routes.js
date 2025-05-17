import { Router } from 'express';
import { createAccountsController,getAllAccountsController,getAccountByIdController} from '../controllers/account.controller.js';
import accountValidator from '../validator/account.validator.js';
import { authMiddleware } from '../middlewares/auth.middleware.js';



const router = Router();
router.post('/post',authMiddleware,accountValidator,createAccountsController);
router.get('/getAll',getAllAccountsController);
router.get('/get/:id',authMiddleware,getAccountByIdController);
router.post('/sendphoto',authMiddleware);

export default router;