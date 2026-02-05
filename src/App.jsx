// App.jsx
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./index.css";
import { useEffect, useState, useCallback } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";

// Pages
import Home from "./Pages/Home";
import About from "./Pages/About";
import Products from "./Pages/Products";
import Contact from "./Pages/Contact";
import Cart from "./Pages/Cart";
import SingleProduct from "./Pages/SingleProduct";
import CategoryProduct from "./Pages/CategoryProduct";

// Components
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ErrorBoundary from "./components/ErrorBoundary";

// Context
import { useCart } from "./context/CartContext";
import ScrollToTop from "react-scroll-to-top";

const App = () => {
  const [location, setLocation] = useState(null);
  const [openDropdown, setOpenDropdown] = useState(false);
  const { cartItem, setCartItem } = useCart();

  /**
   * 📍 Fetch location using Geolocation + OpenStreetMap (Nominatim)
   */
  const getLocation = useCallback(() => {
    if (!navigator.geolocation) {
      toast.error("Geolocation is not supported by your browser.");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        const { latitude, longitude } = pos.coords;
        const url = `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`;

        try {
          const { data } = await axios.get(url);
          setLocation(data.address || {});
          setOpenDropdown(false);
        } catch (error) {
          console.error("Location API error:", error);
          toast.error("Failed to fetch your location.");
        }
      },
      (error) => {
        const errorMessages = {
          1: "Location permission denied.",
          2: "Location unavailable.",
          3: "Location request timed out.",
        };
        toast.error(errorMessages[error.code] || "Unknown location error.");
      }
    );
  }, []);

  /**
   * 🛒 Load cart items from localStorage on first render
   */
  useEffect(() => {
    try {
      const storedCart = localStorage.getItem("cartItem");
      if (storedCart) {
        setCartItem(JSON.parse(storedCart));
      }
    } catch (err) {
      console.error("Cart load error:", err);
      toast.warn("Failed to load cart from storage.");
    }
  }, [setCartItem]);

  /**
   * 🛒 Save cart to localStorage whenever cartItem changes
   */
  useEffect(() => {
    localStorage.setItem("cartItem", JSON.stringify(cartItem));
  }, [cartItem]);

  /**
   * 📍 Auto fetch location on mount
   */
  useEffect(() => {
    getLocation();
  }, [getLocation]);

  return (
    <BrowserRouter>
      <ScrollToTop/>
      <ErrorBoundary>
        <Navbar
          location={location}
          getLocation={getLocation}
          openDropdown={openDropdown}
          setOpenDropdown={setOpenDropdown}
        />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<Products />} />
          <Route path="/products/:id" element={<SingleProduct />} />
          <Route path="/category/:category" element={<CategoryProduct />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route
            path="/cart"
            element={<Cart location={location} getLocation={getLocation} />} />
        </Routes>

        <Footer />
      </ErrorBoundary>
    </BrowserRouter>
  );
};

export default App;
