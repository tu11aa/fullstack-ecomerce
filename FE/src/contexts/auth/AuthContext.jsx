import { createContext, useContext, useReducer } from "react";
import { authReducer, initialAuthState, AUTH_ACTIONS } from "./authReducer";
import api from "../../config/api";

const AuthContext = createContext(null);

const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialAuthState);

  const login = async (credentials) => {
    dispatch({ type: AUTH_ACTIONS.LOGIN_START });

    try {
      // const { user, message } = await api.post("users/login", credentials).data;
      const { user, message } = (await api.post("users/login", credentials))
        .data;

      dispatch({
        type: AUTH_ACTIONS.LOGIN_SUCCESS,
        payload: { user, message },
      });
    } catch (error) {
      dispatch({ type: AUTH_ACTIONS.LOGIN_FAILURE, payload: error });
    }
  };

  const register = async (credentials) => {
    dispatch({ type: AUTH_ACTIONS.REGISTER_START });

    try {
      const { message } = (await api.post("users/register", credentials)).data;

      dispatch({ type: AUTH_ACTIONS.REGISTER_SUCCESS, payload: message });
    } catch (error) {
      dispatch({ type: AUTH_ACTIONS.REGISTER_FAILURE, payload: error });
    }
  };

  const logout = () => {
    dispatch({ type: AUTH_ACTIONS.LOGOUT });
  };

  const getUser = async () => {
    try {
      const { user } = (await api.get("/users/me")).data;

      dispatch({ type: AUTH_ACTIONS.UPDATE_USER, payload: user });
    } catch (error) {
      console.log(error);
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
    throw new Error("useAuth must be used within a AuthProvider");
  }

  return context;
};

export default AuthProvider;
