import React, { useState, useEffect } from "react";
import { NavLink, Link, useLocation } from "react-router-dom";
import { assets } from "../../assets/assets.js";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setIsMenuOpen(false);
  }, [location]);

  return (
    <>
      <div className="fixed px-2 top-0 left-0 right-0 z-50 bg-white shadow-md">
        <div className="flex items-center justify-between py-5 font-medium">
          <Link to="/">
            <img src={assets.logo} className="w-36" alt="logo" />
          </Link>
          <ul className="hidden sm:flex gap-5 text-sm text-gray-700">
            <NavLink to="/" className="flex flex-col items-center gap-1">
              <p>Home</p>
              <hr className="w-2/4 border-none h-[1.5px] bg-gray-700 hidden" />
            </NavLink>
            <NavLink to="/about" className="flex flex-col items-center gap-1">
              <p>About</p>
              <hr className="w-2/4 border-none h-[1.5px] bg-gray-700 hidden" />
            </NavLink>
            <NavLink
              to="/collection"
              className="flex flex-col items-center gap-1"
            >
              <p>Collection</p>
              <hr className="w-2/4 border-none h-[1.5px] bg-gray-700 hidden" />
            </NavLink>
          </ul>

          <div className="flex items-center gap-5">
            <img
              src={assets.search_icon}
              className="w-5 cursor-pointer"
              alt="search"
            />

            <div className="group relative">
              <img
                src={assets.profile_icon}
                className="w-5 cursor-pointer"
                alt="menu"
              />
              <div className="group-hover:block hidden absolute right-0 w-40 p-2 dropdown-menu bg-gray-100 rounded-md text-gray-700 text-center">
                <p className="cursor-pointer hover:text-black p-2">Profile</p>
                <p className="cursor-pointer hover:text-black p-2">Orders</p>
                <p className="cursor-pointer hover:text-black p-2">Logout</p>
              </div>
            </div>
            <Link to="/cart" className="relative">
              <img
                src={assets.cart_icon}
                className="w-5 cursor-pointer min-w-5"
                alt="cart"
              />
              <div className="absolute bottom-[-5px] right-[-5px] w-4 h-4 bg-red-500 rounded-full flex items-center justify-center text-white text-[10px]">
                100
              </div>
            </Link>
            <img
              src={assets.menu_icon}
              className="w-5 cursor-pointer sm:hidden"
              alt="menu"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            />
          </div>
        </div>
        {isMenuOpen && (
          <div className="sm:hidden absolute flex flex-col items-end gap-2 right-0 left-0 top-20 bg-gray-100 rounded-md text-gray-700 p-4 mx-4 shadow-lg">
            <NavLink to="/" className="flex flex-col items-center gap-1">
              <p>Home</p>
              <hr className="w-full border-none h-[1.5px] bg-gray-700 hidden" />
            </NavLink>
            <NavLink to="/about" className="flex flex-col items-center gap-1">
              <p>About</p>
              <hr className="w-full border-none h-[1.5px] bg-gray-700 hidden" />
            </NavLink>
            <NavLink
              to="/collection"
              className="flex flex-col items-center gap-1"
            >
              <p>Collection</p>
              <hr className="w-full border-none h-[1.5px] bg-gray-700 hidden" />
            </NavLink>
          </div>
        )}
      </div>
      <div className="h-24"></div>
    </>
  );
};

export default Navbar;
