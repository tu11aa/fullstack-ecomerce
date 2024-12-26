import express from "express";
import {
  getAllProducts,
  getProductById,
  addProduct,
  //   updateProduct,
  deleteProduct,
} from "../controllers/productController.js";
import upload from "../middlewares/multer.js";
import { adminProtect } from "../middlewares/authMiddleware.js";

const productRouter = express.Router();

productRouter.get("/", getAllProducts);
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
