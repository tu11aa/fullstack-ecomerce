import { useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";
import useGuestCart from "./useGuestCart";
import useCartQuery from "./useCartQuery";

const useCart = (userId = null) => {
  const queryClient = useQueryClient();
  console.log("refreshing useCart", userId);

  // const cart = userId ? remoteCart : guestCart;
  const guestCart = useGuestCart();
  const remoteCart = useCartQuery(userId ? userId : "guest");

  useEffect(() => {
    if (!userId) return;

    console.log("useCart useEffect", userId);

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

  const caculateSelectedItems = (selectedIds) => {
    const { items } = userId ? remoteCart.data : guestCart.guestCart;

    return items.reduce((acc, item) => {
      const product = queryClient.getQueryData(["product", item.productId]); //need refactor here

      return (
        acc +
        (selectedIds.includes(item.productId)
          ? product.price * item.quantity
          : 0)
      );
    }, 0);
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
