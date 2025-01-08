import React from "react";
import ProductItemList from "./ProductItemList";
import ProductItemListWithPagination from "./ProductItemListWithPagination";

const ProductItemCollection = ({
  items,
  itemPerPage = 0,
  title,
  description,
  children,
}) => {
  return (
    <div className="flex flex-col gap-2">
      <div className="flex flex-col items-center gap-2">
        <h1 className="text-4xl font-bold text-gray-800">{title}</h1>
        <p className="text-gray-600">{description}</p>
      </div>
      {children && children}
      {itemPerPage === 0 || items.length < itemPerPage ? (
        <ProductItemList items={items} />
      ) : (
        <ProductItemListWithPagination
          items={items}
          itemPerPage={itemPerPage}
        />
      )}
    </div>
  );
};

export default ProductItemCollection;
