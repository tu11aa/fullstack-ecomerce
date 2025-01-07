import React, { useState } from "react";
import { assets } from "../assets/assets.js";
import { useShop } from "../contexts/shop/ShopContext.jsx";
import ProductItemListWithPagination from "../components/product/ProductItemListWithPagination.jsx";

const Collection = () => {
  const [showFilter, setShowFilter] = useState(true);
  const { shopItems } = useShop().state;

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
        {/* Category Filter */}
        <div
          className={`border border-gray-300 pl-5 py-3 mt-6 ${
            !showFilter ? "hidden" : ""
          }`}
        >
          <p className="mb-3 text-sm font-medium">CATEGORIES</p>

          <div className="flex flex-col gap-2 text-sm font-light text-gray-700">
            <p className="flex gap-2">
              <input
                className="w-3"
                type="checkbox"
                value={"men"}
                name=""
                id=""
              />
              MEN
            </p>
            <p className="flex gap-2">
              <input
                className="w-3"
                type="checkbox"
                value={"women"}
                name=""
                id=""
              />
              WOMEN
            </p>
            <p className="flex gap-2">
              <input
                className="w-3"
                type="checkbox"
                value={"kids"}
                name=""
                id=""
              />
              KIDS
            </p>
          </div>
        </div>
        {/* SubCategory Filter */}
        <div
          className={`border border-gray-300 pl-5 py-3 mt-6 ${
            !showFilter ? "hidden" : ""
          }`}
        >
          <p className="mb-3 text-sm font-medium">CATEGORIES</p>

          <div className="flex flex-col gap-2 text-sm font-light text-gray-700">
            <p className="flex gap-2">
              <input
                className="w-3"
                type="checkbox"
                value={"topwear"}
                name=""
                id=""
              />
              TOPWEAR
            </p>
            <p className="flex gap-2">
              <input
                className="w-3"
                type="checkbox"
                value={"bottomwear"}
                name=""
                id=""
              />
              BOTTOMWEAR
            </p>
            <p className="flex gap-2">
              <input
                className="w-3"
                type="checkbox"
                value={"winterwear"}
                name=""
                id=""
              />
              WINTERWEAR
            </p>
          </div>
        </div>
      </div>
      <ProductItemListWithPagination items={shopItems} itemPerPage={12} />
    </div>
  );
};

export default Collection;
