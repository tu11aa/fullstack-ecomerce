import express from "express";
import {
  getProducts,
  getProductById,
  addProduct,
  // updateProduct,
  deleteProduct,
  getConfigs,
  getLatestProducts,
  getBestSellerProducts,
} from "../controllers/productController.js";
import upload from "../middlewares/multer.js";
import { adminProtect } from "../middlewares/authMiddleware.js";

const productRouter = express.Router();

productRouter.get("/", getProducts);
productRouter.get("/latest", getLatestProducts);
productRouter.get("/best-seller", getBestSellerProducts);

productRouter.get("/configs", getConfigs);
productRouter.post("add", adminProtect, upload.array("images", 4), addProduct);
productRouter.get("/:id", getProductById);
// productRouter.put("/:id", updateProduct);
productRouter.delete("/:id", adminProtect, deleteProduct);

export default productRouter;
