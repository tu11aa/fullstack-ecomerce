import api from '../config/api';

const ROUTE = '/auth';

const login = async (credentials) => {
  const res = await api.post(`${ROUTE}/login`, credentials);
  const { user, message } = res;

  return { user, message };
};

const register = async (credentials) => {
  const res = await api.post(`${ROUTE}/register`, credentials);
  const { message } = res;

  return message;
};

const logout = async () => {
  const res = await api.post(`${ROUTE}/logout`);
  const { message } = res;

  return message;
};

const authApi = { login, register, logout };
export default authApi;
