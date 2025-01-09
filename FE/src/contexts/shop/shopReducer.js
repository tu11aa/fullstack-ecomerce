import { products } from "../../assets/assets";

export const SHOP_ACTIONS = {
  UPDATE_CONFIGS: "UPDATE_CONFIGS",
  UPDATE_CURRENCY: "UPDATE_CURRENCY",

  SET_PRODUCTS: "SET_PRODUCTS",
  SET_LATEST_PRODUCTS: "SET_LATEST_PRODUCTS",
  SET_BESTSELLER_PRODUCTS: "SET_BESTSELLER_PRODUCTS",

  ADD_TO_CART: "ADD_TO_CART",
  REMOVE_FROM_CART: "REMOVE_FROM_CART",
  CLEAR_CART: "CLEAR_CART",

  CHECKOUT: "CHECKOUT",
};

const DEFAULT_CURRENCY = "USD";

export const initialShopState = {
  configs: {
    itemsPerPage: 12,
  },
  currency: localStorage.getItem("currency") || DEFAULT_CURRENCY,
  shopItems: products,
  latestItems: products.slice(0, 14),
  bestsellerItems: products.filter((item) => item.bestseller),
  cartItems: [],
  totalPrice: 0,
  isLoading: false,
  error: null,
};

export const shopReducer = (state, action) => {
  switch (action.type) {
    case SHOP_ACTIONS.UPDATE_CONFIGS:
      return {
        ...state,
        config: {
          ...state.configs,
          ...action.payload,
        },
      };
    case SHOP_ACTIONS.UPDATE_CURRENCY:
      return {
        ...state,
        currency: action.payload,
      };
    case SHOP_ACTIONS.SET_PRODUCTS:
      return {
        ...state,
        shopItems: action.payload,
      };
    case SHOP_ACTIONS.ADD_TO_CART:
      return {
        ...state,
        cartItems: [...state.cartItems, action.payload],
        totalPrice: state.totalPrice + action.payload.price,
      };
    case SHOP_ACTIONS.REMOVE_FROM_CART:
      return {
        ...state,
        cartItems: state.cartItems.filter(
          (item) => item.id !== action.payload.id
        ),
        totalPrice: state.totalPrice - action.payload.price,
      };
    case SHOP_ACTIONS.CLEAR_CART:
      return {
        ...state,
        cartItems: [],
        totalPrice: 0,
      };
    case SHOP_ACTIONS.CHECKOUT:
      return {
        ...state,
        isLoading: true,
        error: null,
      };
    default:
      return state;
  }
};
