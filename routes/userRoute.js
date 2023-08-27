import express from 'express';
import { loginController, registerController } from '../controllers/userController.js';


//router object:
const router = express.Router();

//routers:
// 1. POST || LOGIN:
router.post('/login', loginController)


// 2. POST || REGISTER:
router.post('/register', registerController)

//export:
export default router;