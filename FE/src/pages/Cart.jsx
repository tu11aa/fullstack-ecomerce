import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import CartItem from "../components/cart/CartItem";
import OrderSummary from "../components/cart/OrderSummary";
import LoadingSpinner from "../components/common/LoadingSpinner";
import { useShop } from "../contexts/shop/ShopContext";

const Cart = () => {
  const { cart, isLoading, error, clearCart, caculateSelectedItems } =
    useShop().cartQueries;

  const [selected, setSelected] = useState([]);
  const [total, setTotal] = useState(0);

  const navigate = useNavigate();

  const handleSelected = (productId) => {
    if (selected.includes(productId)) {
      setSelected(selected.filter((id) => id !== productId));
    } else {
      setSelected([...selected, productId]);
    }
  };

  const handleCheckout = () => {
    navigate("/order", { state: { selected } });
  };

  useEffect(() => {
    const foo = async () => {
      const total = await caculateSelectedItems(selected);
      setTotal(total);
    };
    foo();
  }, [selected]);

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (!cart || !cart.items || cart.items.length === 0 || error) {
    return <div className="text-center">No items in cart</div>;
  }

  return (
    <div className="flex flex-col md:flex-row justify-around gap-4">
      <div className="flex flex-col gap-4 w-full md:w-3/4">
        {cart.items.map((product) => (
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              className="w-4 h-4"
              checked={selected.includes(product.productId)}
              onChange={() => handleSelected(product.productId)}
            />
            <CartItem
              key={product.productId}
              productId={product.productId}
              quantity={product.quantity}
            />
          </div>
        ))}
        <button className="blue-button w-full" onClick={() => clearCart()}>
          Clear Cart
        </button>
      </div>
      <div className="flex flex-col gap-4 w-full md:w-1/4">
        <OrderSummary originalPrice={total}>
          <button
            type="button"
            className="blue-button w-1/2 md:w-full"
            onClick={handleCheckout}
          >
            Checkout
          </button>
          <button
            type="button"
            className="gray-outline-button w-1/2 md:w-full"
            onClick={() => navigate("/collection")}
          >
            Continue Shopping
          </button>
        </OrderSummary>
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
