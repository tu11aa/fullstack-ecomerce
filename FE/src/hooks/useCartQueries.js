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
    console.log("use effect init guest cart");

    const storedGuestCart = localStorage.getItem("guestCart");
    if (storedGuestCart) {
      setGuestCart(JSON.parse(storedGuestCart));
    }
  }, []);

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
      console.log("query func");

      if (user) {
        return await cartApi.getCart(userId);
      } else if (guestCart) {
        return guestCart;
      }
      return null;
    },
    enabled: !!user || !!guestCart,
  });
  useEffect(() => {
    if (!isSuccess) return;
    console.log("use effect check to merge guest cart");
    const foo = async () => {
      if (cart?.userId !== "guest" && guestCart) {
        console.log("use effect merge guest cart mutation");
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
    onSuccess: () => {
      if (guestCart) {
        localStorage.setItem("guestCart", JSON.stringify(guestCart));
      }
    },
  };

  const addToCartMutation = useMutation({
    mutationFn: async (data) => {
      const { productId, quantity } = data;

      if (user) {
        console.log("add to cart mutation");
        queryClient.setQueryData(["cart", userId], (prevCart) => {
          if (!prevCart) return null;

          return cartHelper.addToCart(prevCart, productId, quantity);
        });

        return await cartApi.addToCart(data.itemId, data.quantity);
      } else {
        console.log("add to guest cart");
        setGuestCart(cartHelper.addToCart(guestCart, productId, quantity));
      }
    },
    ...mutationOptions,
  });

  const removeFromCartMutation = useMutation({
    mutationFn: async (data) => {
      const { productId, quantity } = data;

      if (user) {
        queryClient.setQueryData(["cart", userId], (prevCart) => {
          if (!prevCart) return null;

          return cartHelper.removeFromCart(prevCart, productId, quantity);
        });

        return await cartApi.removeFromCart(productId, quantity);
      } else {
        setGuestCart(cartHelper.removeFromCart(guestCart, productId, quantity));
      }
    },
    ...mutationOptions,
  });

  const clearCartMutation = useMutation({
    mutationFn: async () => {
      if (user) {
        queryClient.setQueryData(["cart", userId], (prevCart) => {
          if (!prevCart) return null;

          return cartHelper.clearCart(prevCart);
        });

        return await cartApi.removeFromCart(productId, quantity);
      } else {
        console.log("clear guest cart");

        setGuestCart(cartHelper.clearCart(guestCart));
      }
    },
    ...mutationOptions,
  });

  const addToCart = async (productId, quantity = 1) => {
    await addToCartMutation.mutateAsync({ productId, quantity });
  };

  const removeFromCart = async (productId, quantity = 1) => {
    await removeFromCartMutation.mutateAsync({ productId, quantity });
  };

  const clearCart = async () => {
    await clearCartMutation.mutateAsync();
  };

  const caculateSelectedItems = (selectedIds) => {
    const { items } = queryClient.getQueryData(["cart", userId]);
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
    cart,
    isLoading,
    error,
    addToCart,
    removeFromCart,
    clearCart,
    caculateSelectedItems,
  };
};

export default useCartQueries;
