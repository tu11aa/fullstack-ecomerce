import mongoose from "mongoose";
import productHelpers from "../helpers/productHelper.js";

export const CART_STATUS = {
  ACTIVE: "active",
  ABANDONED: "abandoned",
  CONVERTED: "converted",
};

const cartItemSchema = new mongoose.Schema(
  {
    productId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
      min: 1,
    },
    price: {
      type: Number,
    },
    addedAt: {
      type: Date,
      default: Date.now,
    },
    updatedAt: {
      type: Date,
      default: Date.now,
    },
  },
  { _id: false }
);

const cartSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    items: {
      type: [cartItemSchema],
      default: [],
    },
    status: {
      type: String,
      enum: Object.values(CART_STATUS),
      default: CART_STATUS.ACTIVE,
    },
  },
  { timestamps: true }
);

cartSchema.methods.addToCart = async function (productId, quantity = 1) {
  if (quantity < 1) {
    throw new Error("Quantity must be at least 1");
  }

  // Check if product exists and is in stock
  if (!(await productHelpers.isValidProduct(productId))) {
    throw new Error("Invalid product");
  }

  const cartItem = {
    productId: new mongoose.Types.ObjectId(productId.toString()),
    quantity: quantity,
  };

  const itemIndex = this.items.findIndex(
    (item) => item.productId.toString() === productId
  );

  if (itemIndex > -1) {
    cartItem.quantity += this.items[itemIndex].quantity;
    this.items.splice(itemIndex, 1);
  } else {
    cartItem.addedAt = new Date();
  }

  cartItem.updatedAt = new Date();
  this.items.unshift(cartItem);
};

cartSchema.methods.removeFromCart = async function (productId, quantity = 1) {
  if (quantity < 1) {
    throw new Error("Quantity must be at least 1");
  }

  // Check if product exists and is in stock
  if (!(await productHelpers.isValidProduct(productId))) {
    throw new Error("Invalid product");
  }

  const itemIndex = this.items.findIndex(
    (item) => item.productId.toString() === productId
  );

  if (itemIndex === -1) {
    return;
  }

  if (quantity >= this.items[itemIndex].quantity) {
    return this.items.splice(itemIndex, 1);
  }

  const cartItem = {
    productId: new mongoose.Types.ObjectId(productId.toString()),
    quantity: this.items[itemIndex].quantity - quantity,
    updatedAt: new Date(),
  };

  this.items.splice(itemIndex, 1);
  this.items.unshift(cartItem);
};

const cartModel = mongoose.model("Cart", cartSchema);
export default cartModel;
