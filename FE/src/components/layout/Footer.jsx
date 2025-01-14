import React from "react";
import { assets } from "../../assets/assets";

const addresses = [
  "29 Holles Place, Dublin 2 D02 YY46",
  "68 Jay Street, Suite 902 New Side Brooklyn, NY 11201",
];
const categories = [
  "Televisions",
  "Washing Machines",
  "Air Conditioners",
  "Laptops",
  "Accessories",
];
const importantLinks = [
  "About us",
  "Contact Us",
  "Faq",
  "Latest Posts",
  "Order Track",
];

const Footer = () => {
  return (
    <footer className="bg-gray-100 text-gray-700 py-10 px-6">
      {/* Logo Section */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
        <div className="space-y-6">
          <div className="flex items-center space-x-2">
            <img src={assets.logo} className="w-36" alt="logo" />
          </div>

          <div className="space-y-4">
            <h3 className="font-semibold">Our Store Locations</h3>
            <div className="space-y-2">
              {addresses.map((item, index) => (
                <p key={index}>
                  <strong className="italic">{index + 1}. </strong>
                  {item}
                </p>
              ))}
            </div>
          </div>
        </div>

        {/* Categories Section */}
        <div className="space-y-4">
          <h3 className="font-semibold ">Top Categories</h3>
          <ul className="space-y-2">
            {categories.map((item) => (
              <li key={item}>
                <a
                  href="#"
                  className="hover:underline transition-colors duration-200"
                >
                  {item}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Important Links Section */}
        <div className="space-y-4">
          <h3 className="font-semibold">Important Links</h3>
          <ul className="space-y-2">
            {importantLinks.map((item) => (
              <li key={item}>
                <a
                  href="#"
                  className="hover:underline transition-colors duration-200"
                >
                  {item}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Newsletter Section */}
        <div className="space-y-4">
          <h3 className="font-semibold">Newsletter</h3>
          <p className="text-sm">
            Enter your email to receive our latest updates about our products.
          </p>
          <div className="flex flex-col 2xl:flex-row gap-2 ">
            <input
              type="email"
              placeholder="Email address"
              className="bg-[#F4F7FF] px-4 py-2 border border-gray-500 rounded flex-1 text-gray-700"
            />
            <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors duration-200">
              Subscribe
            </button>
          </div>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="max-w-7xl mx-auto mt-12 pt-8 border-t border-gray-700 flex flex-col md:flex-row justify-between items-center gap-4">
        <p className="text-sm">© 2025 FOREVER. All Rights Reserved.</p>

        {/* Payment Methods */}
        <div className="flex items-center gap-4">
          <div className="text-gray-400">
            <svg className="w-10 h-6" viewBox="0 0 24 24" fill="currentColor">
              <path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 14H4V6h16v12z" />
            </svg>
          </div>
        </div>

        {/* Social Links */}
        <div className="flex gap-4">
          {["facebook", "twitter", "instagram", "linkedin"].map((platform) => (
            <a
              key={platform}
              href="#"
              className="text-gray-400 hover:underline transition-colors duration-200"
            >
              <span className="sr-only">{platform}</span>
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0z" />
              </svg>
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
