import api from "../config/api";

const route = "/carts";

const getCart = async (limit = 40) => {
  const { cart } = (await api.get(`${route}?limit=${limit}`)).data;

  return cart;
};

const mergeCart = async (guestCart) => {
  await api.put(`${route}/merge`, guestCart);
};

const addToCart = async (productId, quantity) => {
  await api.post(`${route}/add`, { productId, quantity });
};

const removeFromCart = async (productId, quantity) => {
  await api.post(`${route}/remove`, { productId, quantity });
};

const clearCart = async () => {
  await api.delete(route);
};

const cartApi = {
  getCart,
  mergeCart,
  addToCart,
  removeFromCart,
  clearCart,
};

export default cartApi;
