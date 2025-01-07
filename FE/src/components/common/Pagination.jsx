const Pagination = ({ currentPage, pageCount, handlePageChange }) => {
  const getPageNumbers = () => {
    const delta = 2; // Number of pages to show on each side of current page
    const range = [];
    const rangeWithDots = [];

    // Always add page 1
    range.push(1);

    if (currentPage - delta > 1) {
      range.push("...");
    }

    for (let i = currentPage - 1; i <= currentPage + 1; i++) {
      if (i >= 2 && i < pageCount) {
        range.push(i);
      }
    }

    if (currentPage + delta < pageCount) {
      range.push("...");
    }

    // Always add last page
    if (pageCount > 1) {
      range.push(pageCount);
    }

    return range;
  };

  return (
    <div className="flex justify-center items-center gap-2 mt-4">
      <button
        onClick={() => currentPage > 1 && handlePageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className={`px-3 py-1 border rounded ${
          currentPage === 1 ? "bg-gray-100 text-gray-400" : "hover:bg-gray-100"
        }`}
      >
        Previous
      </button>

      {getPageNumbers().map((pageNum, index) => (
        <button
          key={index}
          onClick={() => pageNum !== "..." && handlePageChange(pageNum)}
          className={`px-3 py-1 border rounded ${
            currentPage === pageNum
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
        onClick={() =>
          currentPage < pageCount && handlePageChange(currentPage + 1)
        }
        disabled={currentPage === pageCount}
        className={`px-3 py-1 border rounded ${
          currentPage === pageCount
            ? "bg-gray-100 text-gray-400"
            : "hover:bg-gray-100"
        }`}
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
