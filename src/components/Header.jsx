import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import useAuthStore from '../store/authStore'; 

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation(); 
  const navigate = useNavigate();

  const { isAuthenticated, logout } = useAuthStore(); 

  const isActive = (path) => location.pathname === path ? 'text-amber-800 font-bold' : 'text-stone-700';

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const closeMenu = () => setIsMenuOpen(false);

  const handleLogout = () => {
    logout(); 
    navigate('/login'); 
  };

  return (
    <header className="fixed top-0 left-0 w-full bg-gray-100 shadow-md z-50">
      <nav className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-16 flex justify-between items-center h-16">
       
        <div className="lg:hidden flex items-center">
          <button
            onClick={toggleMenu}
            className="text-gray-700 focus:outline-none"
            aria-label="Toggle menu"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              className="h-6 w-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
        </div>

        <div className="hidden lg:flex justify-between items-center w-full px-4 lg:px-12">
          <div className="flex space-x-8">
            <Link to="/" className={`text-lg font-semibold hover:text-amber-800 transition duration-200 ${isActive('/')}`}>
              Home
            </Link>
            <Link to="/cart" className={`text-lg font-semibold hover:text-amber-800 transition duration-200 ${isActive('/cart')}`}>
              Cart
            </Link>
            <Link to="/wishlist" className={`text-lg font-semibold hover:text-amber-800 transition duration-200 ${isActive('/wishlist')}`}>
              Wishlist
            </Link>
          </div>

          <div>
            {!isAuthenticated ? (
              <Link
                to="/login"
                className={`text-lg font-semibold hover:text-amber-800 transition duration-200 ${isActive('/login')}`}
              >
                Login
              </Link>
            ) : (
              <button
                onClick={handleLogout}
                className="text-lg font-semibold hover:text-amber-800 transition duration-200"
              >
                Logout
              </button>
            )}
          </div>
        </div>
      </nav>

      <div className={`lg:hidden absolute top-16 left-0 w-full bg-white shadow-md z-50 ${isMenuOpen ? 'block' : 'hidden'}`}>
        <div className="flex flex-col space-y-4 p-4">
          <Link
            to="/"
            className={`text-lg font-semibold hover:text-amber-800 ${isActive('/')}`}
            onClick={closeMenu}
          >
            Home
          </Link>
          <Link
            to="/cart"
            className={`text-lg font-semibold hover:text-amber-800 ${isActive('/cart')}`}
            onClick={closeMenu}
          >
            Cart
          </Link>
          <Link
            to="/wishlist"
            className={`text-lg font-semibold hover:text-amber-800 ${isActive('/wishlist')}`}
            onClick={closeMenu}
          >
            Wishlist
          </Link>
        </div>
      </div>

      <div className="lg:hidden fixed top-0 right-0 flex justify-end items-center p-4">
        {!isAuthenticated ? (
          <Link
            to="/login"
            className={`text-lg font-semibold hover:text-amber-800 transition duration-200 ${isActive('/login')}`}
          >
            Login
          </Link>
        ) : (
          <button
            onClick={handleLogout}
            className="text-lg font-semibold hover:text-amber-800 transition duration-200"
          >
            Logout
          </button>
        )}
      </div>
    </header>
  );
};

export default Header;

