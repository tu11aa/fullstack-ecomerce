import express from "express";
import {
  getAllProducts,
  getProductById,
  addProduct,
  //   updateProduct,
  deleteProduct,
} from "../controllers/productController.js";
import upload from "../middlewares/multer.js";

const productRouter = express.Router();

productRouter.get("/", getAllProducts);
productRouter.post("add", upload.array("images", (maxCount = 4)), addProduct);
productRouter.get("/:id", getProductById);
// productRouter.put("/:id", updateProduct);
productRouter.delete("/:id", deleteProduct);

export default productRouter;
