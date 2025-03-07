import express from "express";
import {
  loginUser,
  registerUser,
  logoutUser,
  adminLogin,
  getMe,
} from "../controllers/userController.js";
import { protect } from "../middlewares/authMiddleware.js";

const userRouter = express.Router();

userRouter.get("/me", protect, getMe);
userRouter.post("/login", loginUser);
userRouter.post("/register", registerUser);
userRouter.post("/logout", protect, logoutUser);
userRouter.post("/admin", adminLogin);

export default userRouter;
