import React from "react";
import { useShop } from "../../contexts/shop/ShopContext";

const OrderSummary = ({ selectedProducts }) => {
  const { caculateSelectedItems } = useShop().cartQueries;
  const originalPrice = caculateSelectedItems(selectedProducts);

  return (
    <div className="flex flex-col gap-4 p-4 border rounded-lg shadow-sm">
      <h3 className="text-lg font-medium text-gray-900 truncate">
        Order Summary:
      </h3>
      <div className="flex justify-between">
        <p className="text-md text-gray-700 line-clamp-2">Original Price</p>
        <p className="text-md text-black">{originalPrice}</p>
      </div>
      <div className="flex justify-between">
        <p className="text-md text-gray-700 line-clamp-2">Discount</p>
        <p className="text-md text-green-600">0</p>
      </div>
      <div className="flex justify-between">
        <p className="text-md text-gray-700 line-clamp-2">Tax</p>
        <p className="text-md text-black">0</p>
      </div>
      <div className="flex justify-between border-t border-t-gray-400 pt-2">
        <p className="text-md font-medium text-gray-900 line-clamp-2">Total</p>
        <p className="text-md text-black">{originalPrice}</p>
      </div>
      <div className="flex md:flex-col gap-2 justify-between">
        <button type="button" className="blue-button w-1/2 md:w-full">
          Checkout
        </button>
        <button type="button" className="gray-outline-button w-1/2 md:w-full">
          Continue Shopping
        </button>
      </div>
    </div>
  );
};

export default OrderSummary;
