import React, { useState } from "react";
import CartItem from "../components/cart/CartItem";
import OrderSummary from "../components/cart/OrderSummary";
import LoadingSpinner from "../components/common/LoadingSpinner";
import { useShop } from "../contexts/shop/ShopContext";

const Cart = () => {
  const { cart, isLoading, error, clearCart } = useShop().cartQueries;

  if (!cart || !cart.items || cart.items.length === 0 || error) {
    return <div className="text-center">No items in cart</div>;
  }

  const [selected, setSelected] = useState([]);

  const handleSelected = (productId) => {
    if (selected.includes(productId)) {
      setSelected(selected.filter((id) => id !== productId));
    } else {
      setSelected([...selected, productId]);
    }
  };

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="flex flex-col md:flex-row justify-around gap-4">
      <div className="flex flex-col gap-4 w-full md:w-3/4">
        {cart.items.map((product) => (
          <CartItem
            key={product.productId}
            productId={product.productId}
            quantity={product.quantity}
            isSelected={selected.includes(product.productId)}
            onSelected={handleSelected}
          />
        ))}
        <button className="blue-button w-full" onClick={() => clearCart()}>
          Clear Cart
        </button>
      </div>
      <div className="flex flex-col gap-4 w-full md:w-1/4">
        <OrderSummary selectedProducts={selected} />
        <div className="flex flex-col gap-4 p-4 border rounded-lg shadow-sm">
          <input
            type="text"
            placeholder="Coupon Code"
            className="gray-outline-input bg-white"
          />
          <button type="button" className="blue-button w-full">
            Apply Coupon
          </button>
        </div>
      </div>
    </div>
  );
};

export default Cart;
