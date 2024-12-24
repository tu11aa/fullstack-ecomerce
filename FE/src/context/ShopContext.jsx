import { createContext, useContext, useReducer } from "react";

const ShopContext = createContext(null);

const ShopDispatchContext = createContext(null);

export default function ShopProvider({ children }) {
  const [shops, dispatch] = useReducer(ShopReducer, initialShop);
  // const currency = "USD";

  return (
    <ShopContext.Provider value={shops}>
      <ShopDispatchContext.Provider value={dispatch}>
        {children}
      </ShopDispatchContext.Provider>
    </ShopContext.Provider>
  );
}

export const useShop = () => {
  return useContext(ShopContext);
};

export const useShopDispatch = () => {
  return useContext(ShopDispatchContext);
};

function ShopReducer(Shop, action) {
  switch (action.type) {
    case "added": {
      return [
        ...Shop,
        {
          id: action.id,
          text: action.text,
          done: false,
        },
      ];
    }
    case "changed": {
      return Shop.map((t) => {
        if (t.id === action.task.id) {
          return action.task;
        } else {
          return t;
        }
      });
    }
    case "deleted": {
      return Shop.filter((t) => t.id !== action.id);
    }
    default: {
      throw Error("Unknown action: " + action.type);
    }
  }
}

const initialShop = [];
