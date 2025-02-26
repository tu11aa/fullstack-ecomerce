import React, { useEffect, useState } from "react";
import { Navigate, useLocation } from "react-router-dom";
import CartItem from "../components/cart/CartItem";
import OrderSummary from "../components/cart/OrderSummary";
import LoadingSpinner from "../components/common/LoadingSpinner";
import { useShop } from "../contexts/shop/ShopContext";
import { useAuth } from "../contexts/auth/AuthContext";
import { toast } from "react-toastify";
// import Addresses from "../components/profile/Addresses";

const Order = () => {
  const { selected } = useLocation().state || {};
  if (!selected) {
    return <Navigate to="/cart" />;
  }

  const { addresses } = useAuth().state.user;
  if (!addresses || addresses.length === 0) {
    // return <Navigate to="/profile#shipping-addresses" />;
  }

  const { cart, isLoading, error, caculateSelectedItems } =
    useShop().cartQueries;
  const [total, setTotal] = useState(0);

  const handleOrder = () => {};

  useEffect(() => {
    if (!addresses || addresses.length === 0) {
      toast.info("Please add shipping address");
    }
  }, [addresses]);

  useEffect(() => {
    const foo = async () => {
      const total = await caculateSelectedItems(selected);
      setTotal(total);
    };
    foo();
  }, [caculateSelectedItems]);

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (!cart || !cart.items || cart.items.length === 0 || error) {
    return <Navigate to="/cart" />;
  }

  return (
    <div className="flex flex-col gap-4">
      {/* <Addresses /> */}
      <div className="flex flex-col md:flex-row justify-around gap-4">
        <div className="flex flex-col gap-4 w-full md:w-3/4">
          {cart.items.map((product) => (
            <CartItem
              key={product.productId}
              productId={product.productId}
              quantity={product.quantity}
            />
          ))}
        </div>
        <div className="flex flex-col gap-4 w-full md:w-1/4">
          <OrderSummary
            originalPrice={total}
            discount={0}
            shippingFee={15}
            tax={total * 0.08}
          >
            <button
              type="button"
              className="blue-button w-1/2 md:w-full"
              onClick={handleOrder}
            >
              Place Order
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
    </div>
  );
};

export default Order;
