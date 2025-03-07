import React from "react";
import { assets } from "../../assets/assets";

const Hero = () => {
  return (
    <div className="flex flex-col md:flex-row border border-gray-400">
      <div className="w-full md:w-1/2 flex flex-col items-center justify-center py-10 sm:py-0">
        <p className="text-gray-600 text-lg prata-regular">Welcome to</p>
        <h1 className="text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600 my-3 prata-regular">
          Forever Store
        </h1>
        <p className="text-gray-600 text-lg prata-regular">
          Your Journey Starts Here
        </p>
      </div>
      <div className="w-full md:w-1/2">
        <img src={assets.hero_img} alt="hero" className="w-full h-full" />
      </div>
    </div>
  );
};

export default Hero;
