import React from "react";

const OrderSummary = ({
  originalPrice = 0,
  tax = null,
  discount = null,
  shippingFee = null,
  children,
}) => {
  const total = originalPrice + tax - discount + shippingFee;

  return (
    <div className="flex flex-col gap-4 p-4 border rounded-lg shadow-sm">
      <h3 className="text-lg font-medium text-gray-900 truncate">
        Order Summary:
      </h3>
      <div className="flex justify-between">
        <p className="text-md text-gray-700 line-clamp-2">Original Price</p>
        <p className="text-md text-black">{originalPrice}</p>
      </div>
      {discount ? (
        <div className="flex justify-between">
          <p className="text-md text-green-500 line-clamp-2">- Discount</p>
          <p className="text-md text-green-600">{discount}</p>
        </div>
      ) : (
        <></>
      )}
      {tax && (
        <div className="flex justify-between">
          <p className="text-md text-gray-700 line-clamp-2">+ Tax</p>
          <p className="text-md text-black">{tax}</p>
        </div>
      )}
      {shippingFee && (
        <div className="flex justify-between">
          <p className="text-md text-gray-700 line-clamp-2">+ Shipping Fee</p>
          <p className="text-md text-black">{shippingFee}</p>
        </div>
      )}
      <div className="flex justify-between border-t border-t-gray-400 pt-2">
        <p className="text-md font-medium text-gray-900 line-clamp-2">Total</p>
        <p className="text-md text-black">{originalPrice ? total : 0}</p>
      </div>
      <div className="flex md:flex-col gap-2 justify-between">{children}</div>
    </div>
  );
};

export default OrderSummary;
