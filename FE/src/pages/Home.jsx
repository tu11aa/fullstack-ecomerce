import React from "react";
import Hero from "../components/layout/Hero";
import { useShop } from "../contexts/shop/ShopContext";
import ProductItemListWithPagination from "../components/product/ProductItemListWithPagination";

const Home = () => {
  const { shopItems } = useShop().state;

  return (
    <>
      <Hero />
      <ProductItemListWithPagination items={shopItems} itemPerPage={12} />
    </>
  );
};

export default Home;
