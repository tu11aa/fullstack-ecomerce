import express from "express";
import {
  getCart,
  mergeCart,
  addToCart,
  removeFromCart,
  clearCart,
} from "../controllers/cartController.js";
import { protect } from "../middlewares/authMiddleware.js";

const cartRouter = express.Router();

cartRouter.get("/", protect, getCart);
cartRouter.put("/merge", protect, mergeCart);
cartRouter.post("/add", protect, addToCart);
cartRouter.post("/remove", protect, removeFromCart);
cartRouter.delete("/", protect, clearCart);

export default cartRouter;
