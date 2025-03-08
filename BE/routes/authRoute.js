import express from 'express';
import {
  loginUser,
  registerUser,
  logoutUser,
  adminLogin,
} from '../controllers/authController.js';
import { protect } from '../middlewares/authMiddleware.js';

const authRouter = express.Router();

authRouter.post('/login', loginUser);
authRouter.post('/register', registerUser);
authRouter.post('/logout', protect, logoutUser);
authRouter.post('/admin', adminLogin);

export default authRouter;
