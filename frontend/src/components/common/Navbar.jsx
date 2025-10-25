// src/components/common/Navbar.jsx
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useCart } from "../../context/CartContext";

const Navbar = () => {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isUserOpen, setIsUserOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { items, cartItemsCount } = useCart();

  return (
    <nav className="bg-gradient-to-r from-yellow-400 to-yellow-500 shadow-lg">
      <div className="max-w-screen-xl px-4 mx-auto 2xl:px-0 py-4">
        <div className="flex items-center justify-between">
          {/* Logo and Menu Links */}
          <div className="flex items-center space-x-8">
            <div className="shrink-0">
              <Link
                to="/"
                className="text-2xl font-bold text-black hover:text-gray-800 transition-colors"
              >
                Ebee.lk
              </Link>
            </div>

            <ul className="hidden lg:flex items-center justify-start gap-6 md:gap-8 py-3 sm:justify-center">
              <li>
                <Link
                  to="/"
                  className="text-sm font-medium text-black hover:text-gray-800 transition-colors duration-200"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  to="/best-sellers"
                  className="text-sm font-medium text-black hover:text-gray-800 transition-colors duration-200"
                >
                  Best Sellers
                </Link>
              </li>
              <li>
                <Link
                  to="/gift-ideas"
                  className="text-sm font-medium text-black hover:text-gray-800 transition-colors duration-200"
                >
                  Gift Ideas
                </Link>
              </li>
              <li>
                <Link
                  to="/deals"
                  className="text-sm font-medium text-black hover:text-gray-800 transition-colors duration-200"
                >
                  Today's Deals
                </Link>
              </li>
              <li>
                <Link
                  to="/sell"
                  className="text-sm font-medium text-black hover:text-gray-800 transition-colors duration-200"
                >
                  Sell
                </Link>
              </li>
            </ul>
          </div>

          {/* Cart & User */}
          <div className="flex items-center lg:space-x-2">
            {/* Cart Button */}
            <div className="relative">
              <Link
                to="/cart"
                className="inline-flex items-center rounded-lg justify-center p-2 hover:bg-black hover:bg-opacity-20 hover:text-white active:bg-black active:bg-opacity-30 active:text-white transition-all duration-200 relative"
              >
                <span className="sr-only">Cart</span>
                <svg
                  className="w-5 h-5 lg:me-1 hover:stroke-white active:stroke-white"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M5 4h1.5L9 16m0 0h8m-8 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm8 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm-8.5-3h9.25L19 7H7.312"
                  />
                </svg>
                <span className="hidden sm:flex font-medium hover:text-white active:text-white">
                  My Cart
                </span>
                {cartItemsCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                    {cartItemsCount}
                  </span>
                )}
              </Link>
            </div>

            {/* User Button */}
            <div className="relative">
              <button
                type="button"
                className={`inline-flex items-center rounded-lg justify-center p-2 hover:bg-black hover:bg-opacity-20 hover:text-white active:bg-black active:bg-opacity-30 active:text-white transition-all duration-200 ${
                  isUserOpen ? "bg-black bg-opacity-10 text-white" : ""
                }`}
                onClick={() => setIsUserOpen(!isUserOpen)}
              >
                <span className="sr-only">Account</span>
                <span
                  className={`font-medium hover:text-white active:text-white ${
                    isUserOpen ? "text-white" : ""
                  }`}
                >
                  Account
                </span>
                <svg
                  className={`w-4 h-4 ms-1 hover:stroke-white active:stroke-white ${
                    isUserOpen ? "stroke-white" : ""
                  }`}
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="m19 9-7 7-7-7"
                  />
                </svg>
              </button>

              {/* User Dropdown */}
              {isUserOpen && (
                <div className="absolute right-0 z-10 mt-2 w-56 bg-white border border-black rounded-lg shadow-2xl p-2 divide-y divide-gray-200">
                  <ul className="text-sm text-gray-900">
                    <li>
                      <Link
                        to="/account"
                        className="block px-3 py-2 hover:bg-yellow-50 hover:text-yellow-700 rounded-md transition-colors"
                      >
                        My Account
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/orders"
                        className="block px-3 py-2 hover:bg-yellow-50 hover:text-yellow-700 rounded-md transition-colors"
                      >
                        My Orders
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/settings"
                        className="block px-3 py-2 hover:bg-yellow-50 hover:text-yellow-700 rounded-md transition-colors"
                      >
                        Settings
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/signout"
                        className="block px-3 py-2 hover:bg-yellow-50 hover:text-yellow-700 rounded-md transition-colors"
                      >
                        Sign Out
                      </Link>
                    </li>
                  </ul>
                </div>
              )}
            </div>

            {/* Mobile menu toggle */}
            <button
              type="button"
              className="inline-flex lg:hidden items-center justify-center hover:bg-black hover:bg-opacity-20 hover:text-white active:bg-black active:bg-opacity-30 active:text-white rounded-md p-2 text-black transition-all duration-200"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              <span className="sr-only">Open Menu</span>
              <svg
                className="w-5 h-5 hover:stroke-white active:stroke-white"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M5 7h14M5 12h14M5 17h14"
                />
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="bg-white border border-black rounded-lg py-3 px-4 mt-4 lg:hidden shadow-lg">
            <ul className="space-y-3 text-gray-900 text-sm font-medium">
              <li>
                <Link
                  to="/"
                  className="block hover:text-yellow-600 transition-colors"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  to="/best-sellers"
                  className="block hover:text-yellow-600 transition-colors"
                >
                  Best Sellers
                </Link>
              </li>
              <li>
                <Link
                  to="/gift-ideas"
                  className="block hover:text-yellow-600 transition-colors"
                >
                  Gift Ideas
                </Link>
              </li>
              <li>
                <Link
                  to="/deals"
                  className="block hover:text-yellow-600 transition-colors"
                >
                  Today's Deals
                </Link>
              </li>
              <li>
                <Link
                  to="/sell"
                  className="block hover:text-yellow-600 transition-colors"
                >
                  Sell
                </Link>
              </li>
            </ul>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
