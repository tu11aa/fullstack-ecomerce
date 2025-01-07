import React, { useState } from "react";
import ProductItemList from "./ProductItemList";
import Pagination from "../common/Pagination";

const ProductItemListWithPagination = ({ items, itemPerPage }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const pageCount = Math.ceil(items.length / itemPerPage);

  const startIndex = (currentPage - 1) * itemPerPage;
  const endIndex = startIndex + itemPerPage;
  const currentItems = items.slice(startIndex, endIndex);

  const handlePageChange = (pageNum) => {
    setCurrentPage(pageNum);
  };

  return (
    <div className="flex flex-col gap-4">
      <ProductItemList items={currentItems} />

      <Pagination
        pageCount={pageCount}
        currentPage={currentPage}
        handlePageChange={handlePageChange}
      />
    </div>
  );
};

export default ProductItemListWithPagination;
