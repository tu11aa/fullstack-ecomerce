import React from "react";
import ProductItemList from "./ProductItemList";
import ProductItemListWithPagination from "./ProductItemListWithPagination";
import LoadingSpinner from "../common/LoadingSpinner";

const ProductItemCollection = ({
  queryData,
  itemsPerPage = 12,
  title,
  description,
  children,
}) => {
  const { data, isLoading, error } = queryData;

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return <div>Error {error.message}</div>;
  }

  return (
    <div className="flex flex-col gap-2">
      <div className="flex flex-col items-center gap-2">
        <h1 className="text-4xl font-bold text-gray-800">{title}</h1>
        <p className="text-gray-600">{description}</p>
      </div>
      {children && children}
      {itemsPerPage === 0 || data.items.length < itemsPerPage ? (
        <ProductItemList items={data.items} />
      ) : (
        <ProductItemListWithPagination items={data.items} />
      )}
    </div>
  );
};

export default ProductItemCollection;
