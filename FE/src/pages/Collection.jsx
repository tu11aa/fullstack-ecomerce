import React, { useEffect, useState } from "react";
import { assets } from "../assets/assets.js";
import { useShop } from "../contexts/shop/ShopContext.jsx";
import ProductItemListWithPagination from "../components/product/ProductItemListWithPagination.jsx";
import CategorySelectBox from "../components/layout/CategorySelectBox.jsx";

const Collection = () => {
  const { shop_categories } = useShop().state.configs;
  const { items, filters } = useShop().state.shop;
  const { setShopFilters } = useShop();

  const [showFilter, setShowFilter] = useState(true);

  useEffect(() => {
    console.log(filters);
  }, [filters]);

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

        {Object.keys(shop_categories).map((key, index) => (
          <CategorySelectBox
            key={index}
            category={shop_categories[key]}
            filters={filters}
            setFilters={setShopFilters}
            showFilter={showFilter}
          />
        ))}
      </div>

      {/* Product List */}
      <ProductItemListWithPagination items={items} itemsPerPage={12} />
    </div>
  );
};

export default Collection;
