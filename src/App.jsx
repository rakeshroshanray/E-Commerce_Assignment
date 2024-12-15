import React, { useEffect } from "react"; 
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import ProductListing from "./pages/ProductListing";
import SingleProduct from "./pages/SingleProduct";
import Header from "./components/Header";
import "./index.css";
import CartPage from "./pages/Cart";
import ProtectedRoute from "./components/ProtectedRoute"; 
import useAuthStore from "./store/authStore"; 
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import WishlistPage from "./pages/WishlistPage";

const App = () => {
  const { initializeAuth, isAuthenticated } = useAuthStore();

  useEffect(() => {
    initializeAuth();
    //setIsLoading(false);
  }, [initializeAuth]);

  return (
    <Router>
      <Header />
      <main className="pt-16">
        <Routes>
          <Route path="/" element={<ProductListing />} />
          <Route path="/products/:id" element={<SingleProduct />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route 
            path="/wishlist" 
            element={ 
            <ProtectedRoute isAuthenticated={isAuthenticated}>
              <WishlistPage />
            </ProtectedRoute>
            } 
            />
          <Route
            path="/cart"
            element={
              <ProtectedRoute isAuthenticated={isAuthenticated}>
                <CartPage />
              </ProtectedRoute>
            }
          />
        </Routes>
      </main>
    </Router>
  );
};

export default App;
