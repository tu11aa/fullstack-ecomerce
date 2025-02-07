import React, { useEffect, useState } from "react";
import { assets } from "../assets/assets.js";
import { useShop } from "../contexts/shop/ShopContext.jsx";
import CategorySelectBox from "../components/layout/CategorySelectBox.jsx";
import useProductsQueries from "../hooks/useProductsQueries.js";
import LoadingSpinner from "../components/common/LoadingSpinner.jsx";
import Pagination from "../components/common/Pagination.jsx";
import ProductItemList from "../components/product/ProductItemList.jsx";
import { useSearchParams } from "react-router-dom";

const Collection = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const currentPage = searchParams.get("page")
    ? parseInt(searchParams.get("page"))
    : 1;

  const { shop_categories } = useShop().state.configs;
  const {
    data,
    isLoading,
    isPlaceholderData,
    error,
    page,
    setPage,
    filters,
    setFilters,
  } = useProductsQueries("all", currentPage);

  const [showFilter, setShowFilter] = useState(true);

  useEffect(() => {
    if (currentPage !== page) {
      setPage(currentPage);
    }
    // setFilters(searchParams.get("filters") ? {} : {});
  }, [searchParams]);

  const handleSelectBoxChange = (category, selectedValues) => {
    setFilters({
      ...filters,
      [category]: selectedValues,
    });
  };

  const handleNextPage = () => {
    setSearchParams({ page: page + 1 });
  };

  const handlePrevPage = () => {
    setSearchParams({ page: page - 1 });
  };

  const handleGotoPage = (_page) => {
    setSearchParams({ page: _page });
  };

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return <div>Error {error.message}</div>;
  }
  return (
    <div className="flex flex-col md:flex-row gap-1 sm:gap-10 pt-10 border-t">
      {/* Filter Options */}
      <div className="min-w-60">
        <div className="flex items-center justify-center">
          <p className="m-2 text-xl text-center cursor-poiter">FILTERS</p>
          <img
            src={assets.dropdown_icon}
            className={`h-4 ml-auto md:hidden ${showFilter ? "rotate-90" : ""}`}
            alt="dropdown"
            onClick={() => setShowFilter(!showFilter)}
          />
        </div>

        {Object.entries(shop_categories).map(([_, shop_category], index) => (
          <CategorySelectBox
            key={index}
            category={shop_category}
            values={
              filters[shop_category.name] ? filters[shop_category.name] : []
            }
            onChange_={handleSelectBoxChange}
            showFilter={showFilter}
          />
        ))}
      </div>

      {/* Product List */}
      <div className="flex flex-col gap-4 justify-center w-full">
        {isPlaceholderData ? (
          <LoadingSpinner />
        ) : (
          <ProductItemList items={data.items} />
        )}
        <Pagination
          initialPage={currentPage}
          pageCount={data.totalPages}
          onNextPage={handleNextPage}
          onPrevPage={handlePrevPage}
          onGotoPage={handleGotoPage}
        />
      </div>
    </div>
  );
};

export default Collection;
