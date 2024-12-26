import productModel from "../models/productModel.js";
import { v2 as cloudinary } from "cloudinary";

const getAllProducts = async (req, res) => {
  try {
    const products = await productModel.find();
    res.status(200).json({ success: true, products });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: error.message });
  }
};

const getProductById = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await productModel.findById(id);
    res.status(200).json({ success: true, product });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: error.message });
  }
};

const addProduct = async (req, res) => {
  try {
    const {
      name,
      price,
      description,
      category,
      subCategory,
      sizes,
      bestSeller,
    } = req.body;
    const { images } = req.files;

    const imageUrls = await uploadImages(images);

    const product = await productModel.create({
      name,
      price: Number(price),
      description,
      images: imageUrls,
      category,
      subCategory,
      sizes: JSON.parse(sizes),
      bestSeller: bestSeller === "true" ? true : false,
      date: Date.now(),
    });

    res
      .status(201)
      .json({ success: true, message: "Product added successfully", product });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: error.message });
  }
};

const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      name,
      price,
      description,
      image,
      category,
      subCategory,
      sizes,
      bestSeller,
    } = req.body;

    //check if images changed, then reupload to cloundinary

    const product = await productModel.findByIdAndUpdate(id, {
      name,
      price: Number(price),
      description,
      images: imageUrls,
      category,
      subCategory,
      sizes: JSON.parse(sizes),
      bestSeller: bestSeller === "true" ? true : false,
      date: Date.now(),
    });

    res.status(200).json({
      success: true,
      message: "Product updated successfully",
      product,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: error.message });
  }
};

const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await productModel.findByIdAndDelete(id);
    res.status(200).json({
      success: true,
      message: "Product deleted successfully",
      product,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: error.message });
  }
};

export {
  getAllProducts,
  getProductById,
  addProduct,
  //   updateProduct,
  deleteProduct,
};

const uploadImages = async (images) => {
  let imageUrls = await Promise.all(
    images.map(async (image) => {
      let result = await cloudinary.uploader.upload(image.path, {
        resource_type: "image",
      });
      return result.secure_url;
    })
  );
};
