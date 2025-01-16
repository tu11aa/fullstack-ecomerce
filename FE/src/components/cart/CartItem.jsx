import React from "react";
// import { Heart, X, Minus, Plus } from "lucide-react";

const CartItem = ({ name, description, price, quantity }) => {
  return (
    <div className="flex items-center gap-6 p-4 border rounded-lg shadow-sm">
      {/* Product Image */}
      <div className="w-24 h-24 bg-gray-100 flex items-center justify-center">
        <img
          src="/api/placeholder/96/96"
          alt="Product"
          className="w-25 h-25 object-contain"
        />
      </div>

      <div className="flex flex-col gap-4 lg:gap-0 lg:flex-row">
        {/* Product Details */}
        <div className="flex-1 min-w-0">
          <h3 className="text-lg font-medium text-gray-900">{name}</h3>
          <p className="mt-1 text-sm text-gray-500 line-clamp-2">
            {description}
          </p>
        </div>

        <div className="flex lg:flex-row justify-between lg:justify-normal gap-4">
          {/* Price */}
          <div className="text-xl font-semibold text-gray-900 w-24 text-center self-center">
            ${price.toLocaleString()}
          </div>

          {/* Quantity Controls */}
          <div className="flex items-center gap-1">
            <button
              className="p-1 rounded-full hover:bg-gray-100"
              aria-label="Decrease quantity"
            >
              {/* <Minus className="w-5 h-5 text-gray-600" /> */}-
            </button>

            <span className="min-w-8 text-center font-medium">{quantity}</span>

            <button
              className="p-1 rounded-full hover:bg-gray-100"
              aria-label="Increase quantity"
            >
              {/* <Plus className="w-5 h-5 text-gray-600" /> */}+
            </button>
          </div>
        </div>
      </div>

      <button className="flex items-center text-red-500 hover:text-red-700">
        {/* <X className="w-5 h-5 mr-1" /> */}X
      </button>
    </div>
  );
};

export default CartItem;
