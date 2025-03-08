import productHelpers from "../helpers/productHelper.js";
import { SHOP_CATEGORIES } from "../libs/constant.js";
import productModel from "../models/productModel.js";
import asyncHandler from "express-async-handler";

const DEFAULT_CONFIGS = {
  ITEMS_PER_PAGE: 12,
  CURRENCY: "VND",
  SORT_FIELD: "date",
  SORT_ORDER: "desc",
};

const getConfigs = asyncHandler(async (_, res) => {
  const configs = {
    shop_categories: SHOP_CATEGORIES,
    itemsPerPage: DEFAULT_CONFIGS.ITEMS_PER_PAGE,
  };
  res.status(200).json({ success: true, configs });
});

const getProducts = asyncHandler(async (req, res) => {
  const page =
    req.query.page === "all" ? req.query.page : parseInt(req.query.page) || 1;
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

  let products;
  if (page === "all") {
    products = await productModel.find(filter).sort(sort).limit(limit);
  } else {
    const startIndex = (page - 1) * DEFAULT_CONFIGS.ITEMS_PER_PAGE;
    const endIndex = startIndex + DEFAULT_CONFIGS.ITEMS_PER_PAGE;

    products = await productModel
      .find(filter)
      .sort(sort)
      .skip(startIndex)
      .limit(endIndex);
  }

  //to be implemented price conversion

  const total = await products.countDocuments(filter);
  const totalPages = Math.ceil(total / DEFAULT_CONFIGS.ITEMS_PER_PAGE);

  res.status(200).json({ success: true, products, total, totalPages });
});

const getLatestProducts = asyncHandler(async (_, res) => {
  const products = await productModel
    .find()
    .sort({ date: -1 })
    .limit(DEFAULT_CONFIGS.ITEMS_PER_PAGE);

  res.status(200).json({ success: true, products });
});

const getBestSellerProducts = asyncHandler(async (_, res) => {
  const products = await productModel.find({ bestSeller: true });

  res.status(500).json({ success: true, products });
});

const getProductById = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { isMinimized } = req.query;

  const product = await productModel.findById(id);
  if (isMinimized) {
    return res.status(200).json({
      success: true,
      product: {
        _id: product._id,
        name: product.name,
        discription: product.description,
        price: product.price,
        image: product.images[0],
      },
    });
  }
  res.status(200).json({ success: true, product });
});

const addProduct = asyncHandler(async (req, res) => {
  const { name, price, description, category, subCategory, sizes, bestSeller } =
    req.body;
  const { images } = req.files;

  const imageUrls = await productHelpers.uploadImages(images);

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
});

const updateProduct = asyncHandler(async (req, res) => {
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
});

const deleteProduct = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const product = await productModel.findByIdAndDelete(id);
  res.status(200).json({
    success: true,
    message: "Product deleted successfully",
    product,
  });
});

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
