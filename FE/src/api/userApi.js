import api from '../config/api';

const ROUTE = '/users';
const ADDRESS_ROUTE = `${ROUTE}/addresses`;

const getMe = async () => {
  const res = await api.get(ROUTE);
  const { user } = res.data;

  return user;
};

const addNewAddress = async (address) => {
  const res = await api.post(ADDRESS_ROUTE, address);
  const { addresses } = res.data;

  return addresses;
};

const updateAddress = async (addressId, address) => {
  const res = await api.put(`${ADDRESS_ROUTE}/${addressId}`, address);
  const { addresses } = res.data;

  return addresses;
};

const deleteAddress = async (addressId) => {
  const res = await api.delete(`${ADDRESS_ROUTE}/${addressId}`);
  const { addresses } = res.data;

  return addresses;
};

const userApi = {
  getMe,
  addNewAddress,
  updateAddress,
  deleteAddress,
};
export default userApi;
