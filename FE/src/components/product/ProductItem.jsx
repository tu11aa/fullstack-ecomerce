import React from "react";
import { Link } from "react-router-dom";
import { useShop } from "../../contexts/shop/ShopContext";

const ProductItem = (props) => {
  const { data } = props;
  const currency = useShop().state.currency;

  return (
    <Link
      to={`/products/${data._id}`}
      className="border border-gray-400 hover:border-black my-4 p-4 text-gray-700 cursor-pointer"
    >
      <div className="overflow-hidden pb-2">
        <img src={data.image[0]} alt={data.name} />
      </div>
      <h3>{data.name}</h3>
      <strong>
        {data.price} {currency}
      </strong>
      <div className="flex flex-row justify-between">
        <button>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="size-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z"
            />
          </svg>
        </button>
        <button type="button">Buy</button>
      </div>
    </Link>
  );
};

export default ProductItem;
