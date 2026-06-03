import  express from "express";
import { save, get, update, remove} from "../controllers/main-section.controller.js";

const router = express.Router();

router.post('/save',save);
router.get('/get', get);
router.put('/update/:id', update);
router.delete('/delete/:id', remove);

export default router;