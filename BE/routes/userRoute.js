import express from 'express';
import {
  addNewAddress,
  deleteAddress,
  getMe,
  updateAddress,
} from '../controllers/userController.js';
import { protect } from '../middlewares/authMiddleware.js';

const userRouter = express.Router();
const addressesRouter = express.Router();

userRouter.get('/', protect, getMe);

addressesRouter.post('/', protect, addNewAddress);
addressesRouter.put('/:addressId', protect, updateAddress);
addressesRouter.delete('/:addressId', protect, deleteAddress);

userRouter.use('/addresses', addressesRouter);

export default userRouter;
