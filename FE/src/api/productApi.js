import api from "../config/api";

const route = "/products";

const getProductById = async (productId) => {
  const { product } = (await api.get(`${route}/${productId}`)).data;

  return product;
};

const getProducts = async (page, filter) => {};

const productApi = {
  getProductById,
  getProducts,
};

export default productApi;
