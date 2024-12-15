import React from "react";
import Logo from "../assets/logo.webp";

const Footer = () => {
  return (
    <footer className="bg-amber-950 text-white py-6 mt-12">
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-center text-center md:text-left">
          <div className="mb-4 md:mb-0">
            <img src={Logo} alt="Logo" className="h-12 w-auto" />
            <p className="text-sm">Best Place to Shop Everything</p>
          </div>

          <div className="flex flex-col md:flex-row gap-6">
            <div className="flex flex-col">
              <h3 className="font-semibold">Quick Links</h3>
              <a href="/" className="text-sm text-gray-400 hover:text-white">
                Home
              </a>
              <a
                href="/about"
                className="text-sm text-gray-400 hover:text-white"
              >
                About
              </a>
              <a
                href="/contact"
                className="text-sm text-gray-400 hover:text-white"
              >
                Contact
              </a>
              <a href="/faq" className="text-sm text-gray-400 hover:text-white">
                FAQ
              </a>
            </div>
            <div className="flex flex-col">
              <h3 className="font-semibold">Customer Service</h3>
              <a
                href="/returns"
                className="text-sm text-gray-400 hover:text-white"
              >
                Returns
              </a>
              <a
                href="/shipping"
                className="text-sm text-gray-400 hover:text-white"
              >
                Shipping
              </a>
              <a
                href="/privacy-policy"
                className="text-sm text-gray-400 hover:text-white"
              >
                Privacy Policy
              </a>
              <a
                href="/terms-of-service"
                className="text-sm text-gray-400 hover:text-white"
              >
                Terms of Service
              </a>
            </div>
          </div>

          <div className="flex gap-4 mt-6 md:mt-0">
            <a
              href="https://www.linkedin.com/in/rakesh-roshan-324a8ab5/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-white"
            >
              <i className="fab fa-linkedin-in"></i>
            </a>
            <a
              href="https://leetcode.com/u/rakesh878/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-white"
            >
              <img
                src="https://img.icons8.com/?size=100&id=wDGo581Ea5Nf&format=png&color=000000"
                alt="LeetCode"
                className="w-6 h-6" 
              />
            </a>

            <a
              href="https://github.com/rakeshroshanray"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-white"
            >
              <i className="fab fa-github"></i>
            </a>
            <a
              href="https://www.linkedin.com/in/rakesh-roshan-324a8ab5/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-white"
            >
              <i className="fab fa-youtube"></i>
            </a>
          </div>
        </div>

        <div className="flex flex-col items-center mt-6">
          <a
            href="mailto:rakeshroshan878@gmail.com"
            className="text-sm text-gray-400 hover:text-white"
          >
            📧 rakeshroshan878@gmail.com
          </a>
          <a
            href="tel:+1234567890"
            className="text-sm text-gray-400 hover:text-white"
          >
            📱 +91 7982440627
          </a>
        </div>

        {/* Copyright */}
        <div className="text-center text-sm mt-8">
          <p>
            &copy; {new Date().getFullYear()} | Rakesh Roshan Ray | All rights
            reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
