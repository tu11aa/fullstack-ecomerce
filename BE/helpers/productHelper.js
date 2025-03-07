import mongoose from "mongoose";
import { v2 as cloudinary } from "cloudinary";
import productModel from "../models/productModel.js";

const productHelpers = {};

productHelpers.uploadImages = async (images) => {
  let imageUrls = await Promise.all(
    images.map(async (image) => {
      let result = await cloudinary.uploader.upload(image.path, {
        resource_type: "image",
      });
      return result.secure_url;
    })
  );
  return imageUrls;
};

productHelpers.isValidProduct = async (id) => {
  return (
    mongoose.Types.ObjectId.isValid(id) &&
    (await productModel.exists({ _id: id }))
  );
};

export default productHelpers;
