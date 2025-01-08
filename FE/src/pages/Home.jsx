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
    <div className="flex flex-col gap-12">
      <Hero />
      <ProductItemCollection
        items={latestItems}
        itemPerPage={itemPerPage}
        title={"Latest Items"}
        description={
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia. Desunt mollit anim id est laborum."
        }
      >
        <p
          className="text-right cursor-pointer underline"
          onClick={() => navigate("/collection")}
        >
          See More...
        </p>
      </ProductItemCollection>

      <ProductItemCollection
        items={bestsellerItems}
        itemPerPage={itemPerPage}
        title={"Bestseller Items"}
        description={
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia. Desunt mollit anim id est laborum."
        }
      />
    </div>
  );
};

export default Home;
