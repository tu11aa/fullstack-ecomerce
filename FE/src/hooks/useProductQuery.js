import { useQuery } from "@tanstack/react-query";
import productApi from "../api/productApi";

const useProductQuery = (productId) => {
  const {
    data: product,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["product", productId],
    queryFn: async () => {
      return await productApi.getProductById(productId);
    },
  });

  return { product, isLoading, error };
};

export default useProductQuery;
