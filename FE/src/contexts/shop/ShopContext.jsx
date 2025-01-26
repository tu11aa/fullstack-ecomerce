import React, { createContext, useContext, useReducer } from "react";
import { shopReducer, initialShopState, SHOP_ACTIONS } from "./shopReducer";
import api from "../../config/api";
import { useAuth } from "../auth/AuthContext";
import useCartQueries from "../../hooks/useCartQueries";

const ShopContext = createContext(null);

const ShopProvider = ({ children }) => {
  const { user } = useAuth().state;
  const cartQueries = useCartQueries();
  const [state, dispatch] = useReducer(shopReducer, initialShopState);

  // const updateConfigs = (configs) => {
  //   dispatch({ type: SHOP_ACTIONS.UPDATE_CONFIGS, payload: configs });
  // };

  // const updateCurrency = (currency) => {
  //   dispatch({ type: SHOP_ACTIONS.UPDATE_CURRENCY, payload: currency });
  //   localStorage.setItem("currency", currency);
  // };

  const setShopFilters = (filters) => {
    state = {
      ...state,
      shop: {
        ...state.shop,
        filters,
      },
    };

    dispatch({ type: SHOP_ACTIONS.SUCCESS, payload: state });
  };

  //   const setProducts = (products) => {
  //     dispatch({ type: SHOP_ACTIONS.SET_PRODUCTS, payload: products });
  //   };

  const value = {
    state,

    cartQueries,
    // updateCurrency,

    setShopFilters,

    // setProducts,
  };

  return <ShopContext.Provider value={value}>{children}</ShopContext.Provider>;
};

export const useShop = () => {
  const context = useContext(ShopContext);
  if (!context) {
    throw new Error("useShop must be used within a ShopProvider");
  }
  return context;
};

export default ShopProvider;
