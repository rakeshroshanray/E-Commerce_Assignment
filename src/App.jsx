import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ProductListing from './pages/ProductListing';
import SingleProduct from './pages/SingleProduct';
import Header from './components/Header'; 
import './index.css';
import CartPage from './pages/Cart';
const App = () => {
  return (
    <Router>
      <Header /> 
      <main className="pt-16"> 
        <Routes>
          <Route path="/" element={<ProductListing />} />
          <Route path="/products/:id" element={<SingleProduct />} />
          <Route path="/cart" element={<CartPage />} />

        </Routes>
      </main>
    </Router>
  );
};

export default App;
