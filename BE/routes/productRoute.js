import express from "express";
import {
  getProducts,
  getProductById,
  addProduct,
  // updateProduct,
  deleteProduct,
  getConfigs,
} from "../controllers/productController.js";
import upload from "../middlewares/multer.js";
import { adminProtect } from "../middlewares/authMiddleware.js";

const productRouter = express.Router();

productRouter.get("/", getProducts);
productRouter.get("/configs", getConfigs);
productRouter.post(
  "add",
  adminProtect,
  upload.array("images", (maxCount = 4)),
  addProduct
);
productRouter.get("/:id", getProductById);
// productRouter.put("/:id", updateProduct);
productRouter.delete("/:id", adminProtect, deleteProduct);

export default productRouter;
