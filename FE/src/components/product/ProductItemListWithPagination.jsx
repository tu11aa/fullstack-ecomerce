import React, { useState } from "react";
import ProductItemList from "./ProductItemList";
import Pagination from "../common/Pagination";

const ProductItemListWithPagination = ({ items, itemsPerPage = 12 }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const pageCount = Math.ceil(items.length / itemsPerPage);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentItems = items.slice(startIndex, endIndex);

  const handleNextPage = () => {
    setCurrentPage(currentPage + 1);
  };

  const handlePrevPage = () => {
    setCurrentPage(currentPage - 1);
  };

  const handleGotoPage = (_page) => {
    setCurrentPage(_page);
  };

  return (
    <div className="flex flex-col gap-4">
      <ProductItemList items={currentItems} />

      <Pagination
        pageCount={pageCount}
        onNextPage={handleNextPage}
        onPrevPage={handlePrevPage}
        onGotoPage={handleGotoPage}
      />
    </div>
  );
};

export default ProductItemListWithPagination;
