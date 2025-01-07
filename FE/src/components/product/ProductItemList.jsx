import React from "react";
import ProductItem from "./ProductItem";

const ProductItemList = ({ items }) => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 gap-y-2 min-w-96">
      {items.map((data) => (
        <ProductItem data={data} key={data._id} />
      ))}
    </div>
  );
};

export default ProductItemList;
