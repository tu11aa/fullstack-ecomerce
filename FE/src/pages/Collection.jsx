import React, { useState } from "react";
import { assets } from "../assets/assets.js";

const Collection = () => {
  const [showFilter, setShowFilter] = useState(true);

  return (
    <div className="flex flex-col md:flex-row gap-1 sm:gap-10 pt-10 border-t">
      {/* Filter Options */}
      <div className="min-w-60" onClick={() => setShowFilter(!showFilter)}>
        <p className="m-2 text-xl text-center cursor-poiter">
          FILTERS
          <img
            src={assets.dropdown_icon}
            className={`h-3 sm:hidden ${showFilter && "rotate-90"}`}
            alt="dropdown"
          />
        </p>
        {/* Category Filter */}
        <div
          className={`border border-gray-300 pl-5 py-3 mt-6 ${
            !showFilter && "hidden"
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
            !showFilter && "hidden"
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
    </div>
  );
};

export default Collection;
