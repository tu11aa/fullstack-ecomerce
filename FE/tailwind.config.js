import { PRODUCT_COLOR_CLASSNAME } from "./libs/colorConstant";

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      screens: {
        "3xl": "1920px",
      },
    },
  },
  safelist: [...Object.values(PRODUCT_COLOR_CLASSNAME)],
  plugins: [],
};
