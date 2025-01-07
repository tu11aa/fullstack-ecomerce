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
        <button>Add to Cart</button>
        <button type="button">Buy</button>
      </div>
    </Link>
  );
};

export default ProductItem;
