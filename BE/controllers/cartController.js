import cartModel, { CART_STATUS } from "../models/cartModel.js";
import productHelpers from "../helpers/productHelper.js";
import asyncHandler from "express-async-handler";

const getCart = asyncHandler(async (req, res) => {
  const limit = parseInt(req.query.limit) || null;

  const query = cartModel.findOne({ userId: req.user._id });
  if (limit) {
    query.limit(limit);
  }

  const cart = await query;

  if (!cart) {
    return res.status(404).json({ message: "Cart not found" });
  }

  res.status(200).json({ success: true, cart });
});

const mergeCart = asyncHandler(async (req, res) => {
  const userId = req.user._id;
  const { items } = req.body;

  let cart = await cartModel.findOne({
    userId,
    status: CART_STATUS.ACTIVE,
  });

  if (!cart) {
    cart = new cartModel({
      userId,
    });
  }

  for (const item of items) {
    if (!(await productHelpers.isValidProduct(item.productId))) {
      continue;
    }
    await cart.addToCart(item.productId, item.quantity);
  }

  await cart.save();

  res.status(200).json({ success: true, cart });
});

const addToCart = asyncHandler(async (req, res) => {
  const userId = req.user._id;
  const { productId, quantity = 1 } = req.body;

  if (quantity < 1) {
    return res.status(400).json({ message: "Quantity must be at least 1" });
  }

  // Check if product exists and is in stock
  if (!(await productHelpers.isValidProduct(productId))) {
    return res.status(404).json({ message: "Invalid product" });
  }

  // Find or create cart for user
  let cart = await cartModel.findOne({
    userId,
    status: CART_STATUS.ACTIVE,
  });

  if (!cart) {
    cart = new cartModel({
      userId,
    });
  }

  await cart.addToCart(productId, quantity);
  await cart.save();

  res.status(200).json({
    message: "Item added to cart successfully",
  });
});

const removeFromCart = asyncHandler(async (req, res) => {
  const userId = req.user._id;
  const { productId, quantity = 1 } = req.body;

  if (quantity < 1) {
    return res.status(400).json({ message: "Quantity must be at least 1" });
  }

  // Check if product exists and is in stock
  if (!(await productHelpers.isValidProduct(productId))) {
    return res.status(404).json({ message: "Invalid product" });
  }

  // Find or create cart for user
  let cart = await cartModel.findOne({
    userId,
    status: CART_STATUS.ACTIVE,
  });

  if (!cart) {
    return res.status(404).json({ message: "Cart not found" });
  }

  await cart.removeFromCart(productId, quantity);
  await cart.save();

  res.status(200).json({
    message: "Item removed from cart successfully",
  });
});

const clearCart = asyncHandler(async (req, res) => {
  const userId = req.user._id;

  // Find or create cart for user
  let cart = await cartModel.findOne({
    userId,
    status: CART_STATUS.ACTIVE,
  });

  if (!cart) {
    return res.status(404).json({ message: "Cart not found" });
  }

  cart.items = [];
  await cart.save();

  res.status(200).json({ message: "Cart cleared successfully" });
});

export { getCart, mergeCart, addToCart, removeFromCart, clearCart };
