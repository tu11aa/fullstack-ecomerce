export const SHOP_ACTIONS = {
  ADD_TO_CART: "ADD_TO_CART",
  REMOVE_FROM_CART: "REMOVE_FROM_CART",
  CLEAR_CART: "CLEAR_CART",
  CHECKOUT: "CHECKOUT",
  SET_CURRENCY: "SET_CURRENCY",
};

export const initialShopState = {
  shopItems: [],
  cartItems: [],
  totalPrice: 0,
  currency: "USD",
  isLoading: false,
  error: null,
};

export const shopReducer = (state, action) => {
  switch (action.type) {
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
    case SHOP_ACTIONS.SET_CURRENCY:
      return {
        ...state,
        currency: action.payload,
      };
    default:
      return state;
  }
};
