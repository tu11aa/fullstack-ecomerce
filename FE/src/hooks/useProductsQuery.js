import {
  keepPreviousData,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import productApi from "../api/productApi";
import { useEffect, useState } from "react";

const useProductsQuery = (
  collection = "all",
  initialPage = 1,
  initialFilters = {}
) => {
  const [page, setPage] = useState(initialPage);
  const [filters, setFilters] = useState(initialFilters);

  const queryClient = useQueryClient();

  const getProducts = async (page = 0) => {
    switch (collection) {
      case "bestseller":
        return await productApi.getBestSellerProducts();
      case "latest":
        return await productApi.getLatestProducts();
      default:
        return await productApi.getProducts(page, filters);
    }
  };

  const queryData = useQuery({
    queryKey: [`${collection}-products`, page],
    queryFn: async () => {
      return await getProducts(page);
    },
    placeholderData: keepPreviousData,
  });

  const { data, isPlaceholderData } = queryData;

  useEffect(() => {
    if (!isPlaceholderData && page < data?.totalPages) {
      queryClient.prefetchQuery({
        queryKey: [`${collection}-products`, page + 1],
        queryFn: async () => {
          return await getProducts(page + 1);
        },
      });
    }
  }, [data, isPlaceholderData, page, queryClient]);

  return {
    ...queryData,
    page,
    setPage,
    filters,
    setFilters,
  };
};

export default useProductsQuery;
