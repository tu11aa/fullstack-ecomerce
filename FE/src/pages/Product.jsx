import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import LoadingSpinner from "../components/common/LoadingSpinner";
import { PRODUCT_COLOR_CLASSNAME } from "../libs/colorConstant";
import useProductQueries from "../hooks/useProductQueries";
import { useShop } from "../contexts/shop/ShopContext";

const additionalData = {
  discount: 10,
  rating: 4.5,
  reviewCount: 120,
  colors: ["black", "gray", "blue"],
  sizes: ["S", "M", "L", "XL"],
  keyFeatures: ["Industry-leading noise cancellation", "30-hour battery life"],
};

const Product = () => {
  const { productId } = useParams();

  const { product, isLoading, error } = useProductQueries(productId);
  const { addToCart } = useShop().cartQueries;

  const [quantity, setQuantity] = useState(1);
  const [currentColor, setCurrentColor] = useState();
  const [currentImage, setCurrentImage] = useState("");

  useEffect(() => {
    if (!currentImage) setCurrentImage(product ? product.images[0] : "");
  }, [product]);

  if (error) {
    return <div>Error {error.message}</div>;
  }

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <>
      <div className="flex flex-wrap -mx-4">
        {/* <!-- Product Images --> */}
        <div className="w-full md:w-2/5 px-4 mb-8">
          <img
            src={currentImage}
            alt="Product"
            className="w-auto h-auto rounded-lg shadow-md mb-4 mx-auto"
          />
          <div className="flex gap-4 py-4 justify-center overflow-x-auto">
            {product.images.map((src, index) => (
              <img
                key={src}
                src={src}
                alt={`Thumbnail ${index}`}
                className="size-16 sm:size-20 object-cover rounded-md cursor-pointer opacity-60 hover:opacity-100 transition duration-300"
                onClick={() => setCurrentImage(src)}
              />
            ))}
          </div>
        </div>

        {/* <!-- Product Details --> */}
        <div className="w-full md:w-1/2 px-4">
          <h2 className="text-3xl font-bold mb-2">{product.name}</h2>
          <p className="text-gray-600 mb-4">SKU: {product._id}</p>
          <div className="mb-4">
            <span className="text-2xl font-bold mr-2">${product.price}</span>
            <span className="text-gray-500 line-through">
              ${product.price + 10}
            </span>
          </div>
          <div className="flex items-center mb-4">
            {Array.from(Array(5)).map((_, index) => (
              <svg
                key={index}
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill={
                  index <= Math.ceil(additionalData.rating) ? "gold" : "none"
                }
                className="size-6 text-yellow-500"
              >
                <path
                  fillRule="evenodd"
                  d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z"
                  clipRule="evenodd"
                />
              </svg>
            ))}

            <span className="ml-2 text-gray-600">
              {additionalData.rating} ({additionalData.reviewCount} reviews)
            </span>
          </div>
          <p className="text-gray-700 mb-6">{product.description}</p>

          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-2">Color:</h3>
            <div className="flex space-x-2">
              {additionalData.colors.map((color) => (
                <button
                  key={color}
                  value={color}
                  onClick={(e) =>
                    e.target.value === currentColor
                      ? setCurrentColor(null)
                      : setCurrentColor(e.target.value)
                  }
                  className={`w-8 h-8 ${
                    PRODUCT_COLOR_CLASSNAME[color]
                  } rounded-full ${
                    color === currentColor &&
                    `focus:outline-none focus:ring-2 focus:ring-offset-2`
                  }`}
                ></button>
              ))}
            </div>
          </div>

          <div className="mb-6">
            <label
              htmlFor="quantity"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Quantity:
            </label>
            <input
              type="number"
              id="quantity"
              name="quantity"
              min="1"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
              className="w-12 text-center rounded-md border-gray-300  shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            />
          </div>

          <div className="flex space-x-4 mb-6">
            <button
              className="blue-button flex gap-2 items-center"
              onClick={() => addToCart(product._id, quantity)}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="size-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z"
                />
              </svg>
              Add to Cart
            </button>
            <button
              className="gray-outline-button flex gap-2 items-center  text-gray-800"
              onClick={() => addToCart(product._id, quantity)}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="size-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"
                />
              </svg>
              Wishlist
            </button>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-2">Key Features:</h3>
            <ul className="list-disc list-inside text-gray-700">
              {additionalData.keyFeatures.map((feature) => (
                <li key={feature}>{feature}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default Product;
