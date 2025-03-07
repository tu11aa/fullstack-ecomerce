import { useEffect, useState } from "react";
import cartHelper from "../libs/helpers/cartHelper";

const useGuestCart = () => {
  const [guestCart, setGuestCart] = useState(null);

  useEffect(() => {
    const storedGuestCart = localStorage.getItem("guestCart");
    if (storedGuestCart) {
      setGuestCart(JSON.parse(storedGuestCart));
    }
  }, []);

  useEffect(() => {
    if (guestCart) {
      localStorage.setItem("guestCart", JSON.stringify(guestCart));
    }
  }, [guestCart]);

  const addToCart = (productId, quantity = 1) => {
    setGuestCart(cartHelper.addToCart(guestCart, productId, quantity));
  };

  const removeFromCart = async (productId, quantity = 1) => {
    setGuestCart(cartHelper.removeFromCart(guestCart, productId, quantity));
  };

  const clearCart = () => {
    setGuestCart(cartHelper.clearCart(guestCart));
  };

  const deleteCart = () => {
    setGuestCart(null);
    localStorage.removeItem("guestCart");
  };

  return {
    guestCart,
    isLoading: false,
    error: null,
    addToCart,
    removeFromCart,
    clearCart,
    deleteCart,
  };
};

export default useGuestCart;
