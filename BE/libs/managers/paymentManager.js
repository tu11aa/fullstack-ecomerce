import dotenv from "dotenv";

dotenv.config();

export const PAYMENT_METHOD = {
  COD: "cod",
  CREDIT_CARD: "credit_card",
  BANK_TRANSFER: "bank_transfer",
  MOMO: "momo",
  ZALOPAY: "zalopay",
};

export const PAYMENT_STATUS = {
  PENDING: "pending",
  AUTHORIZED: "authorized",
  CAPTURED: "captured",
  FAILED: "failed",
  REFUNDED: "refunded",
  PARTIALLY_REFUNDED: "partially_refunded",
};

const processPayment = async (amount, paymentMethod, paymentToken) => {
  try {
    if (paymentMethod === PAYMENT_METHOD.COD) {
      //todo: to be implement later
    } else {
      throw new Error("Unsupported payment method");
    }
  } catch (error) {
    throw error; // Re-throw the error to be handled by the calling function
  }
};

const paymentManager = {
  processPayment,
};

export default paymentManager;
