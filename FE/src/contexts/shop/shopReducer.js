import { products } from "../../assets/assets";
import { SHOP_CONSTANT } from "../../mocks/shopConstant";

export const SHOP_ACTIONS = {
  START: "START",
  SUCCESS: "SUCCESS",
  FAILURE: "FAILURE",
  RESET: "RESET",
};

const DEFAULT_CURRENCY = "VND";

export const initialShopState = {
  configs: {
    itemsPerPage: 12,
    shop_categories: SHOP_CONSTANT.shop_categories,
  },
  shop: {
    items: products,
    latestItems: products.slice(0, 14),
    bestsellerItems: products.filter((item) => item.bestseller),
    filters: {},
  },
  currency: localStorage.getItem("currency") || DEFAULT_CURRENCY,
  isLoading: false,
  error: null,
  message: "",
};

export const shopReducer = (state, action) => {
  switch (action.type) {
    case SHOP_ACTIONS.START:
      return {
        ...state,
        isLoading: true,
        error: null,
        message: "",
      };
    case SHOP_ACTIONS.SUCCESS:
      return {
        ...state,
        isLoading: false,
        error: null,
        message: "",
        ...action.payload,
      };
    case SHOP_ACTIONS.FAILURE:
      return {
        ...state,
        isLoading: false,
        error: action.payload,
        message: "",
      };
    case SHOP_ACTIONS.RESET:
      return {
        ...initialShopState,
        shop: state.shop,
        cart: state.cart,
      };
    default:
      return state;
  }
};
