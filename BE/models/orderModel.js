import mongoose from 'mongoose';
import { addressSchema } from './userModel';
import {
  PAYMENT_METHOD,
  PAYMENT_STATUS,
} from '../libs/managers/paymentManager';
import { SHIPPING_METHOD } from '../libs/managers/shippingManager';

export const ORDER_STATUS = {
  PENDING: 'pending',
  CONFIRMED: 'confirmed',
  SHIPPING: 'shipping',
  DELIVERED: 'delivered',
  COMPLETED: 'completed',
  CANCELLED: 'cancelled',
  RETURNED: 'returned',
  REFUNDED: 'refunded',
};

const orderItemSchema = new mongoose.Schema(
  {
    productId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Product',
      required: true,
    },
    originalPrice: { type: Number, required: true }, // Price at time of order
    price: { type: Number, required: true }, // Price at time of order (after discount)
    quantity: { type: Number, required: true },
    name: {
      type: String, // Store product name at time of order (in case it changes)
      required: true,
    },
    image: {
      type: String, // Store image URL at time of order
      required: true,
    },
  },
  { _id: false }
); // No separate _id for order items (they are part of the order)

const orderSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    items: [orderItemSchema],
    shippingAddress: {
      type: addressSchema,
      required: true,
      _id: false,
    },
    billingAddress: {
      type: addressSchema,
      _id: false,
    },
    shippingMethod: {
      type: String,
      enum: Object.values(SHIPPING_METHOD),
      default: SHIPPING_METHOD.STANDARD,
    },
    paymentMethod: {
      type: String, // e.g., "credit_card", "momo", "zalopay", "cod"
      enum: Object.values(PAYMENT_METHOD),
      required: true,
    },
    paymentStatus: {
      type: String,
      enum: Object.values(PAYMENT_STATUS),
      default: PAYMENT_STATUS.PENDING,
    },
    transactionId: {
      type: String, // Store the ID from the payment gateway
    },
    status: {
      type: String,
      enum: Object.values(ORDER_STATUS),
      default: ORDER_STATUS.PENDING,
    },
    totalAmount: { type: Number, required: true },
    shippingFee: { type: Number, required: true },
    discountAmount: { type: Number, default: 0 },
    taxAmount: { type: Number, default: 0 },
    totalAmount: { type: Number, required: true },
    orderNotes: { type: String },
    shippingPartner: { type: String },
    shippingTrackingCode: { type: String },
  },
  { timestamps: true }
);

const orderModel = mongoose.model('Order', orderSchema);

export default orderModel;
