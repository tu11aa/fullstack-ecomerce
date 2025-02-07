import { useState } from "react";

const Pagination = ({
  initialPage = 1,
  pageCount,
  onNextPage,
  onPrevPage,
  onGotoPage,
  delta = 2, // Number of pages to show on each side of current page
}) => {
  const [page, setPage] = useState(initialPage);

  const getPageNumbers = () => {
    const range = [];
    const rangeWithDots = [];

    // Always add page 1
    range.push(1);

    if (page - delta > 1) {
      range.push("...");
    }

    for (let i = page - 1; i <= page + 1; i++) {
      if (i >= 2 && i < pageCount) {
        range.push(i);
      }
    }

    if (page + delta < pageCount) {
      range.push("...");
    }

    // Always add last page
    if (pageCount > 1) {
      range.push(pageCount);
    }

    return range;
  };

  const handleNextPage = () => {
    setPage(page + 1);
    onNextPage();
  };

  const handlePrevPage = () => {
    setPage(page - 1);
    onPrevPage();
  };

  const handleGotoPage = (_page) => {
    setPage(_page);
    onGotoPage(_page);
  };

  return (
    <div className="flex justify-center items-center gap-2 mt-4">
      <button
        onClick={() => page > 1 && handlePrevPage()}
        disabled={page === 1}
        className={`px-3 py-1 border rounded ${
          page === 1 ? "bg-gray-100 text-gray-400" : "hover:bg-gray-100"
        }`}
      >
        Previous
      </button>

      {getPageNumbers().map((pageNum, index) => (
        <button
          key={index}
          onClick={() => pageNum !== "..." && handleGotoPage(pageNum)}
          className={`px-3 py-1 border rounded ${
            page === pageNum
              ? "bg-blue-500 text-white"
              : pageNum === "..."
              ? "cursor-default"
              : "hover:bg-gray-100"
          }`}
        >
          {pageNum}
        </button>
      ))}

      <button
        onClick={() => page < pageCount && handleNextPage()}
        disabled={page === pageCount}
        className={`px-3 py-1 border rounded ${
          page === pageCount ? "bg-gray-100 text-gray-400" : "hover:bg-gray-100"
        }`}
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
