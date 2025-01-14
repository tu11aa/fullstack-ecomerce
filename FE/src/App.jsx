import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import Navbar from "./components/layout/Navbar";
import Product from "./pages/Product";
import Collection from "./pages/Collection";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import { ToastContainer } from "react-toastify";
import "react-toastify/ReactToastify.css";
import { useAuth } from "./contexts/auth/AuthContext";
import { useEffect } from "react";
import Footer from "./components/layout/Footer";

function App() {
  const { getUser } = useAuth();

  useEffect(() => {
    getUser();
  }, []);

  return (
    <>
      <div className="px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw]">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/about" element={<About />} />
          <Route path="/collection" element={<Collection />} />
          <Route path="/products/:productId" element={<Product />} />
        </Routes>
        <ToastContainer />
      </div>
      <Footer />
    </>
  );
}

export default App;
