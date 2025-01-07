import React, { useState } from "react";
import ProductItem from "./ProductItem";

const ProductItemList = ({ items }) => {
  return (
    <div className="grid grid-col-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-2">
      {items.map((data) => (
        <ProductItem data={data} key={data._id} />
      ))}
    </div>
  );
};

export default ProductItemList;
