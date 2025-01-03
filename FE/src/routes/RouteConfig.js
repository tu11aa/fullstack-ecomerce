import { lazy } from "react";
import { AuthProvider } from "../contexts/auth/AuthContext";
import { ShopProvider } from "../contexts/shop/ShopContext";

const Home = lazy(() => import("../pages/Home"));
const Login = lazy(() => import("../pages/Login"));
const About = lazy(() => import("../pages/About"));
const Collection = lazy(() => import("../pages/Collection"));
const Product = lazy(() => import("../pages/Product"));

//remember to add isProtected props to the routes for protected ones
//providers position must be reversed in order to be rendered correctly
export const routes = [
  {
    path: "/",
    element: Home,
    providers: [ShopProvider, AuthProvider],
  },
  {
    path: "/login",
    element: Login,
    providers: [AuthProvider],
  },
  {
    path: "/about",
    element: About,
    providers: [AuthProvider],
  },
  {
    path: "/collection",
    element: Collection,
    providers: [ShopProvider, AuthProvider],
  },
  {
    path: "/products/:productId",
    element: Product,
    providers: [ShopProvider, AuthProvider],
  },
];
