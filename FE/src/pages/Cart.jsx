import React from "react";
import CartItem from "../components/cart/CartItem";
import OrderSummary from "../components/cart/OrderSummary";

const cartItems = [
  {
    _id: "1",
    name: "PC system All in One APPLE iMac (2023) mqrq3ro/a",
    description:
      'Apple M3, 24" Retina 4.5K, 8GB, SSD 256GB, 10-core GPU, Keyboard layout INT',
    price: 1499,
    quantity: 2,
  },
  {
    _id: "2",
    name: "PC system All in One APPLE iMac (2023) mqrq3ro/a",
    description:
      'Apple M3, 24" Retina 4.5K, 8GB, SSD 256GB, 10-core GPU, Keyboard layout INT',
    price: 1499,
    quantity: 2,
  },
  {
    _id: "3",
    name: "PC system All in One APPLE iMac (2023) mqrq3ro/a",
    description:
      'Apple M3, 24" Retina 4.5K, 8GB, SSD 256GB, 10-core GPU, Keyboard layout INT',
    price: 1499,
    quantity: 2,
  },
];

const Cart = () => {
  return (
    <div className="flex flex-col md:flex-row justify-around gap-4">
      <div className="grid grid-cols-1 gap-4 md:gap-6">
        {cartItems.map((item) => (
          <CartItem key={item._id} {...item} />
        ))}
      </div>
      <div className="flex flex-col gap-4 w-full md:w-1/4">
        <OrderSummary />
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
import CartItem from "../components/cart/CartItem";
import OrderSummary from "../components/cart/OrderSummary";
import Button from "../components/common/Button";

const cartItems = [
  {
    _id: "1",
    name: "PC system All in One APPLE iMac (2023) mqrq3ro/a",
    description:
      'Apple M3, 24" Retina 4.5K, 8GB, SSD 256GB, 10-core GPU, Keyboard layout INT',
    price: 1499,
    quantity: 2,
  },
  {
    _id: "2",
    name: "PC system All in One APPLE iMac (2023) mqrq3ro/a",
    description:
      'Apple M3, 24" Retina 4.5K, 8GB, SSD 256GB, 10-core GPU, Keyboard layout INT',
    price: 1499,
    quantity: 2,
  },
  {
    _id: "3",
    name: "PC system All in One APPLE iMac (2023) mqrq3ro/a",
    description:
      'Apple M3, 24" Retina 4.5K, 8GB, SSD 256GB, 10-core GPU, Keyboard layout INT',
    price: 1499,
    quantity: 2,
  },
];

const Cart = () => {
  return (
    <div className="flex flex-col md:flex-row justify-around gap-4">
      <div className="grid grid-cols-1 gap-4 md:gap-6">
        {cartItems.map((item) => (
          <CartItem key={item._id} {...item} />
        ))}
      </div>
      <div className="flex flex-col gap-4 w-full md:w-1/4">
        <OrderSummary />
        <div className="flex flex-col gap-4 p-4 border rounded-lg shadow-sm">
          <Button
            className_="w-full"
            onClick={(e) => {
              console.log(e);
            }}
          >
            Apply Coupon
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Cart;
