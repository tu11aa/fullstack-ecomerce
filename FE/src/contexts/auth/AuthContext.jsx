import { createContext, useContext, useReducer, useEffect } from 'react';
import { authReducer, initialAuthState, AUTH_ACTIONS } from './authReducer';
import api from '../../config/api';
import authApi from '../../api/authApi';
import userApi from '../../api/userApi';

const AuthContext = createContext(null);

const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialAuthState);

  useEffect(() => {
    getUser();
  }, []);

  const login = async (credentials) => {
    dispatch({ type: AUTH_ACTIONS.START });

    try {
      const { user, message } = await authApi.login(credentials);

      dispatch({
        type: AUTH_ACTIONS.LOGIN_SUCCESS,
        payload: { user, message },
      });
    } catch (error) {
      dispatch({ type: AUTH_ACTIONS.FAILURE, payload: error });
    }
  };

  const register = async (credentials) => {
    dispatch({ type: AUTH_ACTIONS.START });

    try {
      const message = await authApi.register(credentials);

      dispatch({ type: AUTH_ACTIONS.SUCCESS, payload: message });
    } catch (error) {
      dispatch({ type: AUTH_ACTIONS.FAILURE, payload: error });
    }
  };

  const logout = async () => {
    dispatch({ type: AUTH_ACTIONS.START });

    try {
      const message = await authApi.logout();

      dispatch({ type: AUTH_ACTIONS.LOGOUT_SUCCESS, payload: message });
    } catch (error) {
      dispatch({ type: AUTH_ACTIONS.FAILURE, payload: error });
    }
  };

  const getUser = async () => {
    dispatch({ type: AUTH_ACTIONS.START });

    try {
      const user = await userApi.getMe();

      dispatch({ type: AUTH_ACTIONS.UPDATE_USER_SUCCESS, payload: user });
    } catch (error) {
      dispatch({ type: AUTH_ACTIONS.FAILURE, payload: error });
    }
  };

  const updateUser = (user) => {
    dispatch({ type: AUTH_ACTIONS.UPDATE_USER, payload: user });
  };

  const value = {
    state,
    dispatch,
    login,
    register,
    logout,
    getUser,
    updateUser,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth must be used within a AuthProvider');
  }

  return context;
};

export default AuthProvider;
