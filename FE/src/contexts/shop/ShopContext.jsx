import React, { createContext, useContext, useReducer } from "react";
import { shopReducer, initialShopState, SHOP_ACTIONS } from "./shopReducer";

const ShopContext = createContext(null);

const ShopProvider = ({ children }) => {
  const [state, dispatch] = useReducer(shopReducer, initialShopState);

  const updateConfigs = (configs) => {
    dispatch({ type: SHOP_ACTIONS.UPDATE_CONFIGS, payload: configs });
  };

  const updateCurrency = (currency) => {
    dispatch({ type: SHOP_ACTIONS.UPDATE_CURRENCY, payload: currency });
    localStorage.setItem("currency", currency);
  };

  const setShopFilters = (filters) => {
    dispatch({ type: SHOP_ACTIONS.SET_SHOP_FILTERS, payload: filters });
  };

  const addToCart = (product) => {
    dispatch({ type: SHOP_ACTIONS.ADD_TO_CART, payload: product });
  };

  const removeFromCart = (productId) => {
    dispatch({ type: SHOP_ACTIONS.REMOVE_FROM_CART, payload: productId });
  };

  const clearCart = () => {
    dispatch({ type: SHOP_ACTIONS.CLEAR_CART, payload: null });
  };

  //   const setProducts = (products) => {
  //     dispatch({ type: SHOP_ACTIONS.SET_PRODUCTS, payload: products });
  //   };

  const value = {
    state,
    dispatch,

    updateCurrency,

    setShopFilters,

    addToCart,
    removeFromCart,
    clearCart,
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
