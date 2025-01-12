import { uploadImages } from "../helpers/productHelper.js";
import { SHOP_CATEGORIES } from "../libs/constant.js";
import productModel from "../models/productModel.js";

const DEFAULT_CONFIGS = {
  ITEMS_PER_PAGE: 12,
  CURRENCY: "USD",
  SORT_FIELD: "date",
  SORT_ORDER: "desc",
};

const getConfigs = async (req, res) => {
  try {
    const configs = {
      shop_categories: SHOP_CATEGORIES,
      itemsPerPage: DEFAULT_CONFIGS.ITEMS_PER_PAGE,
    };
    res.status(200).json({ success: true, configs });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: error.message });
  }
};

const getProducts = async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || DEFAULT_CONFIGS.ITEMS_PER_PAGE;

  const currency = req.query.currency || DEFAULT_CONFIGS.CURRENCY;

  const filter = JSON.parse(req.query.filter) || {};

  const search = req.query.search || "";
  if (search) {
    filter.name = { $regex: search, $options: "i" };
  }

  const sortField = req.query.sortField || DEFAULT_CONFIGS.SORT_FIELD;
  const sortOrder = req.query.sortOrder || DEFAULT_CONFIGS.SORT_ORDER;
  const sort = { [sortField]: sortOrder === "asc" ? 1 : -1 };

  const startIndex = (page - 1) * DEFAULT_CONFIGS.ITEMS_PER_PAGE;
  const endIndex = startIndex + limit;

  try {
    const products = await productModel
      .find(filter)
      .sort(sort)
      .skip(startIndex)
      .limit(endIndex);

    //to be implemented price conversion

    const total = await products.countDocuments(filter);

    res.status(200).json({ success: true, products, total });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: error.message });
  }
};

const getLatestProducts = async (_, res) => {
  try {
    const products = await productModel
      .find()
      .sort({ date: -1 })
      .limit(DEFAULT_CONFIGS.ITEMS_PER_PAGE);

    res.status(200).json({ success: true, products });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: error.message });
  }
};

const getBestSellerProducts = async (_, res) => {
  try {
    const products = await productModel.find({ bestSeller: true });

    res.status(500).json({ success: true, products });
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
  getConfigs,
  getProducts,
  getLatestProducts,
  getBestSellerProducts,
  getProductById,
  addProduct,
  //   updateProduct,
  deleteProduct,
};
