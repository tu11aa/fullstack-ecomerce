import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import cartApi from "../api/cartApi";
import cartHelper from "../libs/helpers/cartHelper";

const useCartQuery = (userId = "guest") => {
  const queryClient = useQueryClient();
  const queryKey = ["cart", userId];

  const queryData = useQuery({
    queryKey,
    queryFn: async () => {
      if (userId !== "guest") {
        return await cartApi.getCart(userId);
      }
      return null;
    },
    enabled: userId !== "guest",
  });

  const mutationOptions = {
    onMutate: () => {
      // Store previous cart data before mutation
      return {
        previousCart: queryClient.getQueryData(queryKey),
      };
    },
    onError: (error, variables, context) => {
      queryClient.setQueryData(queryKey, context.previousCart);
      console.error("Mutation failed, reverting optimistic update:", error);
    },
  };

  const mergeGuestCartMutation = useMutation({
    mutationFn: async (cart) => {
      return await cartApi.mergeCart(cart.items);
    },
    onSuccess: () => {
      queryClient.removeQueries(["cart", "guest"]);
    },
  });

  const addToCartMutation = useMutation({
    mutationFn: async (data) => {
      const { productId, quantity } = data;

      queryClient.setQueryData(queryKey, (prevCart) => {
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

      queryClient.setQueryData(queryKey, (prevCart) => {
        if (!prevCart) return null;

        return cartHelper.removeFromCart(prevCart, productId, quantity);
      });

      return await cartApi.removeFromCart(productId, quantity);
    },
    ...mutationOptions,
  });

  const clearCartMutation = useMutation({
    mutationFn: async () => {
      queryClient.setQueryData(queryKey, (prevCart) => {
        if (!prevCart) return null;

        return cartHelper.clearCart(prevCart);
      });

      return await cartApi.removeFromCart(productId, quantity);
    },
    ...mutationOptions,
  });

  const mergeCart = async (cart) => {
    await mergeGuestCartMutation.mutateAsync(cart);
  };

  const addToCart = async (productId, quantity = 1) => {
    await addToCartMutation.mutateAsync({ productId, quantity });
  };

  const removeFromCart = async (productId, quantity = 1) => {
    await removeFromCartMutation.mutateAsync({
      productId,
      quantity,
    });
  };

  const clearCart = async () => {
    await clearCartMutation.mutateAsync();
  };

  return {
    ...queryData,
    mergeCart,
    addToCart,
    removeFromCart,
    clearCart,
  };
};

export default useCartQuery;
