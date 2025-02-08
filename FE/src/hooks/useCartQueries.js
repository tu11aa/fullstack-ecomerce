import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import cartApi from "../api/cartApi";
import cartHelper from "../libs/helpers/cartHelper";
import { useAuth } from "../contexts/auth/AuthContext";

const useCartQueries = () => {
  const queryClient = useQueryClient();
  const { user } = useAuth().state;
  const userId = user ? user._id : "guest";

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

  const mergeGuestCartMutation = useMutation({
    mutationFn: async (cart) => {
      return await mergeCart(cart);
    },
    onSuccess: () => {
      setGuestCart(null);
      localStorage.removeItem("guestCart");
      queryClient.invalidateQueries(["cart", userId]);
    },
  });

  const {
    data: cart,
    isLoading,
    isSuccess,
    error,
  } = useQuery({
    queryKey: ["cart", userId],
    queryFn: async () => {
      if (user) {
        return await cartApi.getCart(userId);
      }
      return null;
    },
    enabled: !!user,
  });
  useEffect(() => {
    if (!isSuccess) return;

    const foo = async () => {
      if (cart?.userId !== "guest" && guestCart) {
        await mergeGuestCartMutation.mutateAsync(cart);
      }
    };
    foo();
  }, [user, cart, guestCart, isSuccess, mergeGuestCartMutation]);

  const mutationOptions = {
    onMutate: () => {
      // Store previous cart data before mutation
      return {
        previousCart: queryClient.getQueryData(["cart", user?.id]),
      };
    },
    onError: (error, variables, context) => {
      queryClient.setQueryData(["cart", userId], context.previousCart);
      console.error("Mutation failed, reverting optimistic update:", error);
    },
  };

  const addToCartMutation = useMutation({
    mutationFn: async (data) => {
      const { productId, quantity } = data;

      queryClient.setQueryData(["cart", userId], (prevCart) => {
        if (!prevCart) return null;

        return cartHelper.addToCart(prevCart, productId, quantity);
      });

      return await cartApi.addToCart(data.itemId, data.quantity);
    },
    ...mutationOptions,
  });

  const removeFromCartMutation = useMutation({
    mutationFn: async (data) => {
      const { productId, quantity } = data;

      queryClient.setQueryData(["cart", userId], (prevCart) => {
        if (!prevCart) return null;

        return cartHelper.removeFromCart(prevCart, productId, quantity);
      });

      return await cartApi.removeFromCart(productId, quantity);
    },
    ...mutationOptions,
  });

  const clearCartMutation = useMutation({
    mutationFn: async () => {
      queryClient.setQueryData(["cart", userId], (prevCart) => {
        if (!prevCart) return null;

        return cartHelper.clearCart(prevCart);
      });

      return await cartApi.removeFromCart(productId, quantity);
    },
    ...mutationOptions,
  });

  const addToCart = async (productId, quantity = 1) => {
    if (user) {
      await addToCartMutation.mutateAsync({ productId, quantity });
    } else {
      setGuestCart(cartHelper.addToCart(guestCart, productId, quantity));
    }
  };

  const removeFromCart = async (productId, quantity = 1) => {
    if (user) {
      await removeFromCartMutation.mutateAsync({ productId, quantity });
    } else {
      setGuestCart(cartHelper.removeFromCart(guestCart, productId, quantity));
    }
  };

  const clearCart = async () => {
    if (user) {
      await clearCartMutation.mutateAsync();
    } else {
      setGuestCart(cartHelper.clearCart(guestCart));
    }
  };

  const caculateSelectedItems = (selectedIds) => {
    const { items } = user
      ? queryClient.getQueryData(["cart", userId])
      : guestCart;

    return items.reduce((acc, item) => {
      const product = queryClient.getQueryData(["product", item.productId]);

      return (
        acc +
        (selectedIds.includes(item.productId)
          ? product.price * item.quantity
          : 0)
      );
    }, 0);
  };

  return {
    cart: user ? cart : guestCart,
    isLoading,
    error,
    addToCart,
    removeFromCart,
    clearCart,
    caculateSelectedItems,
  };
};

export default useCartQueries;
