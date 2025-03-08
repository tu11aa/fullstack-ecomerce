import mongoose from "mongoose";
import orderModel from "../models/orderModel";
import productModel from "../models/productModel";
import asyncHandler from "express-async-handler";

// Create a new order
const createOrder = asyncHandler(async (req, res) => {
  const {
    items,
    shippingAddress,
    shippingMethod, // shipping feature would be implement later
    shippingFee,
    billingAddress,
    paymentMethod,
    discountCodes, // discount feature would be implement later
    discountAmount,
    notes,
  } = req.body;
  const userId = req.user._id; // Assuming you get the user ID from authentication

  //const acutalShippingFee = null; // todo: re-calculate shipping fee to compare with shippingFee
  //const actualDiscountAmount = 0; // todo: re-calculate discount amount to compare with discountAmount

  // 1. Validate input (VERY IMPORTANT)
  if (!items || items.length === 0) {
    return res.status(400).json({ message: "No items in the order." });
  }
  if (
    !shippingAddress ||
    !shippingAddress.province ||
    !shippingAddress.district ||
    !shippingAddress.ward ||
    !shippingAddress.address
  ) {
    return res.status(400).json({ message: "Invalid Shipping Address" });
  }

  const session = await mongoose.startSession();
  let createdOrder = null;
  try {
    session.startTransaction();

    // 2. Calculate total amount (and check inventory!)
    let totalAmount = 0;
    for (const item of items) {
      const product = await productModel
        .findById(item.productId)
        .session(session);
      if (!product) {
        return res
          .status(404)
          .json({ message: `Product with ID ${item.productId} not found.` });
      }
      if (product.stock < item.quantity) {
        return res
          .status(400)
          .json({ message: `Not enough stock for product ${product.name}` });
      }

      item.originalPrice = product.originalPrice; // Set the price *at this moment*
      item.price = product.price; // Set the price *at this moment*
      item.name = product.name;
      item.image = product.images[0];
      
      totalAmount += item.price * item.quantity;

      // Decrese stock
      product.stock -= item.quantity;
      await product.save({ session });
    }

    // 3. Apply discounts (if any)
    totalAmount -= discountAmount;

    // 4. Add shipping cost
    totalAmount += shippingFee;

    // 5. Create the order
    const newOrder = new orderModel({
      userId,
      items,
      totalAmount,
      shippingAddress,
      billingAddress, // Might be the same as shipping
      paymentMethod,
      shippingFee,
      discountAmount,
      notes,
    });

    // 6.  Handle Payment (CRITICAL)
    //     * For COD:  No immediate payment processing needed.
    //     * For other methods:  Initiate payment with the selected gateway (MoMo, ZaloPay, etc.).
    //       This usually involves redirecting the user to the payment gateway or showing a QR code.
    //       You'll need a separate function to handle this.  Example (pseudo-code):
    //     if (paymentMethod !== 'COD') {
    //         const paymentResult = await initiatePayment(paymentMethod, createdOrder._id, totalAmount);
    //         // ... handle paymentResult (success, failure, redirect URL, etc.)
    //     }

    createdOrder = await newOrder.save({ session });
    await session.commitTransaction();
  } catch (error) {
    await session.abortTransaction();
    throw error;
  } finally {
    await session.endSession();
  }

  res.status(201).json(createdOrder);
});

// Get all orders (for admin)
const getAllOrders = asyncHandler(async (req, res) => {
  // Basic pagination (add more robust pagination later)
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const skip = (page - 1) * limit;
  const orders = await orderModel
    .find()
    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(limit);
  const totalOrders = await orderModel.countDocuments(); // For total pages

  res.status(200).json({
    orders,
    page,
    pages: Math.ceil(totalOrders / limit),
    total: totalOrders,
  });
});

// Get order by ID
const getOrderById = asyncHandler(async (req, res) => {
  const order = await orderModel
    .findById(req.params.id)
    .populate("userId", "name email"); // Populate user details (optional)

  if (!order) {
    return res.status(404).json({ message: "Order not found." });
  }
  // Check if the user is admin or the owner
  if (
    req.user._id.toString() !== order.userId._id.toString() &&
    !req.user.isAdmin
  ) {
    return res
      .status(403)
      .json({ message: "Not authorized to view this order" });
  }
  res.status(200).json(order);
});

// Get my order
const getMyOrders = asyncHandler(async (req, res) => {
  const orders = await orderModel.find({ userId: req.user._id }).sort({
    createdAt: -1,
  });
  res.status(200).json(orders);
});

// Update order status (for admin)
const updateOrderStatus = asyncHandler(async (req, res) => {
  const { status } = req.body;
  if (!status) {
    return res.status(400).json({ message: "Status can not be null" });
  }
  if (!req.user.isAdmin) {
    return res.status(403).json({ message: "Not authorized" });
  }
  const updatedOrder = await orderModel.findByIdAndUpdate(
    req.params.id,
    { orderStatus: status },
    { new: true }
  );
  if (!updatedOrder) {
    return res.status(404).json({ message: "Order not found." });
  }
  // You might send notifications here (e.g., email, SMS) to the customer about the status change.
  res.status(200).json(updatedOrder);
});

// Update payment status (usually via webhook)
const updatePaymentStatus = asyncHandler(async (req, res) => {
  const { status, transactionId } = req.body; // Get status and transaction ID from the payment gateway

  const updatedOrder = await orderModel.findByIdAndUpdate(
    req.params.id,
    { paymentStatus: status, transactionId },
    { new: true }
  );

  if (!updatedOrder) {
    return res.status(404).json({ message: "Order not found." });
  }

  // If payment is successful, you might want to:
  // - Send a confirmation email/SMS to the customer.
  // - Update inventory (if you haven't already).
  // - Trigger any other post-payment actions.

  res.status(200).json(updatedOrder);
});

const cancelOrder = asyncHandler(async (req, res) => {
  const order = await orderModel.findById(req.params.id);
  if (!order) {
    return res.status(404).json({ message: "Order not found." });
  }
  // Check if the user is admin or the owner
  if (
    req.user._id.toString() !== order.userId._id.toString() &&
    !req.user.isAdmin
  ) {
    return res
      .status(403)
      .json({ message: "Not authorized to cancel this order" });
  }
  if (order.orderStatus !== "pending") {
    return res.status(400).json({ message: "Can not cancel order" });
  }
  const updateOrder = await orderModel.findByIdAndUpdate(
    req.params.id,
    { orderStatus: "cancelled" },
    { new: true }
  );
  // Increase Stock
  for (const item of updateOrder.items) {
    const product = await productModel.findById(item.productId);
    product.stock += item.quantity;
    await product.save();
  }
  res.status(200).json(updateOrder);
});

// ... other controller functions (e.g., handleReturns, handleRefunds)

export {
  createOrder,
  getAllOrders,
  getOrderById,
  updateOrderStatus,
  updatePaymentStatus,
  getMyOrders,
  cancelOrder,
};
