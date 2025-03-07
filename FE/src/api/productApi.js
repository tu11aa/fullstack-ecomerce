import { products } from '../assets/assets';
import api from '../config/api';
import { sleep } from '../libs/utils';

const route = '/products';

const getProductById = async (productId) => {
  // const { product } = (await api.get(`${route}/${productId}`)).data;
  const product = products.find((item) => item._id === productId);
  await sleep(1000);
  return product;
};

const getProducts = async (page, filter = {}, sort = '') => {
  // const data = (await api.get(route, { params: { page, filter } }))
  //   .data;
  await sleep(1000);

  return {
    items: products.slice((page - 1) * 12, page * 12),
    totalPages: Math.ceil(products.length / 12),
  };
};

const getLatestProducts = async () => {
  // const data = (await api.get(route, { params: { page, filter } }))
  //   .data;
  await sleep(1000);
  return {
    items: products.slice(0, 24),
  };
};

const getBestSellerProducts = async () => {
  // const data = (await api.get(route, { params: { page, filter } }))
  //   .data;
  await sleep(1000);
  return {
    items: products.filter((item) => item.bestseller),
  };
};

const productApi = {
  getProductById,
  getProducts,
  getLatestProducts,
  getBestSellerProducts,
};

export default productApi;
