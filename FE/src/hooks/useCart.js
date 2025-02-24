import { useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";
import useGuestCart from "./useGuestCart";
import useCartQuery from "./useCartQuery";
import productApi from "../api/productApi";

const useCart = (userId = null) => {
  const queryClient = useQueryClient();

  // const cart = userId ? remoteCart : guestCart;
  const guestCart = useGuestCart();
  const remoteCart = useCartQuery(userId ? userId : "guest");

  useEffect(() => {
    if (!userId) return;

    const foo = async () => {
      if (guestCart.guestCart) {
        await remoteCart.mergeCart(guestCart.guestCart);
        guestCart.deleteCart();
      }
    };
    foo();
  }, [userId]);

  const addToCart = async (productId, quantity = 1) => {
    if (userId) {
      await remoteCart.addToCart(productId, quantity);
    } else {
      guestCart.addToCart(productId, quantity);
    }
  };

  const removeFromCart = async (productId, quantity = 1) => {
    if (userId) {
      await remoteCart.removeFromCart(productId, quantity);
    } else {
      guestCart.removeFromCart(productId, quantity);
    }
  };

  const clearCart = async () => {
    if (userId) {
      await remoteCart.clearCart();
    } else {
      guestCart.clearCart();
    }
  };

  const caculateSelectedItems = async (selectedIds) => {
    const cart = userId ? remoteCart.data : guestCart.guestCart;
    const items = cart ? cart.items : [];

    let sum = 0;
    for (const item of items) {
      if (selectedIds.includes(item.productId)) {
        let product =
          (await queryClient.getQueryData(["product", item.productId])) ||
          (await productApi.getProductById(item.productId));

        sum += item.quantity * product.price;
      }
    }

    return sum;
  };

  const cartDataToReturn = userId
    ? {
        cart: remoteCart.data,
        isLoading: remoteCart.isLoading,
        error: remoteCart.error,
      }
    : {
        cart: guestCart.guestCart,
        isLoading: guestCart.isLoading,
        error: guestCart.error,
      };

  return {
    ...cartDataToReturn,
    addToCart,
    removeFromCart,
    clearCart,
    caculateSelectedItems,
  };
};

export default useCart;
