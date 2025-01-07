import React from "react";
import Hero from "../components/layout/Hero";
import { useShop } from "../contexts/shop/ShopContext";
import ProductItemCollection from "../components/product/ProductItemCollection";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const { bestsellerItems, latestItems } = useShop().state;
  const { itemPerPage } = useShop().state.configs;

  const navigate = useNavigate();

  return (
    <>
      <Hero />
      <ProductItemCollection
        items={latestItems}
        itemPerPage={itemPerPage}
        title={"Latest Items"}
        description={"Description"}
      >
        <p
          className="text-right cursor-pointer"
          onClick={() => navigate("/collection")}
        >
          More...
        </p>
      </ProductItemCollection>

      <ProductItemCollection
        items={bestsellerItems}
        itemPerPage={itemPerPage}
        title={"Bestseller Items"}
        description={"Description"}
      ></ProductItemCollection>
    </>
  );
};

export default Home;
