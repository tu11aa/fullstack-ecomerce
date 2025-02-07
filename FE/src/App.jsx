import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import Navbar from "./components/layout/Navbar";
import Product from "./pages/Product";
import Collection from "./pages/Collection";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Footer from "./components/layout/Footer";
import Cart from "./pages/Cart";
import ProtectedRoute from "./components/utils/ProtectedRoute";
import { ToastContainer } from "react-toastify";
import "react-toastify/ReactToastify.css";
import { useAuth } from "./contexts/auth/AuthContext";
import { useEffect } from "react";
import LoadingSpinner from "./components/common/LoadingSpinner";
import ScrollToTop from "./components/common/ScrollToTop";

function App() {
  const { getUser } = useAuth();
  const { isLoading } = useAuth().state;

  useEffect(() => {
    getUser();
  }, []);

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <ScrollToTop />
      <div className="flex-1 px-2 sm:px-[1vw] md:px-[3vw] lg:px-[5vw]">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/about" element={<About />} />
          <Route path="/collection" element={<Collection />} />
          <Route path="cart" element={<Cart />} />
          <Route path="/products/:productId" element={<Product />} />
        </Routes>
        <ToastContainer />
      </div>
      <Footer />
    </div>
  );
}

export default App;
