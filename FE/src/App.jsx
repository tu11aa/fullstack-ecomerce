import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import Navbar from "./components/layout/Navbar";
import Product from "./pages/Product";
import Collection from "./pages/Collection";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Order from "./pages/Order";
import Cart from "./pages/Cart";
import User from "./pages/User";
import Addresses from "./pages/Addresses";
import Profile from "./pages/Profile";
import Footer from "./components/layout/Footer";
import ProtectedRoute from "./components/utils/ProtectedRoute";
import { ToastContainer } from "react-toastify";
import { useAuth } from "./contexts/auth/AuthContext";
import LoadingSpinner from "./components/common/LoadingSpinner";
import ScrollToTop from "./components/common/ScrollToTop";
import "react-toastify/ReactToastify.css";

function App() {
  const { isLoading } = useAuth().state;

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <ScrollToTop />
      <div className="flex-1 px-2 sm:px-[1vw] md:px-[3vw] lg:px-[5vw]">
        <Routes>
          <Route index element={<Home />} />
          <Route path="home" element={<Home />} />
          <Route path="login" element={<Login />} />
          <Route path="signup" element={<Signup />} />
          <Route path="about" element={<About />} />
          <Route path="collection" element={<Collection />} />
          <Route path="cart" element={<Cart />} />
          <Route path="products/:productId" element={<Product />} />
          <Route
            path="order"
            element={
              <ProtectedRoute>
                <Order />
              </ProtectedRoute>
            }
          />
          <Route
            path="user"
            element={
              <ProtectedRoute>
                <User />
              </ProtectedRoute>
            }
          >
            <Route index element={<Profile />} />
            <Route path="profile" element={<Profile />} />
            <Route path="addresses" element={<Addresses />} />
          </Route>
        </Routes>
        <ToastContainer />
      </div>
      <Footer />
    </div>
  );
}

export default App;
