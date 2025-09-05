// src/components/common/Navbar.jsx
import React, { useState } from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isUserOpen, setIsUserOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <nav className="bg-white dark:bg-gray-800 antialiased">
      <div className="max-w-screen-xl px-4 mx-auto 2xl:px-0 py-4">
        <div className="flex items-center justify-between">

          {/* Logo and Menu Links */}
          <div className="flex items-center space-x-8">
            <div className="shrink-0">
              <Link to="/">
                <img
                  className="block w-auto h-8 dark:hidden"
                  src="https://flowbite.s3.amazonaws.com/blocks/e-commerce/logo-full.svg"
                  alt="Logo"
                />
                <img
                  className="hidden w-auto h-8 dark:block"
                  src="https://flowbite.s3.amazonaws.com/blocks/e-commerce/logo-full-dark.svg"
                  alt="Logo"
                />
              </Link>
            </div>

            <ul className="hidden lg:flex items-center justify-start gap-6 md:gap-8 py-3 sm:justify-center">
              <li><Link to="/home" className="text-sm font-medium text-gray-900 hover:text-primary-700 dark:text-white dark:hover:text-primary-500">Home</Link></li>
              <li><Link to="/best-sellers" className="text-sm font-medium text-gray-900 hover:text-primary-700 dark:text-white dark:hover:text-primary-500">Best Sellers</Link></li>
              <li><Link to="/gift-ideas" className="text-sm font-medium text-gray-900 hover:text-primary-700 dark:text-white dark:hover:text-primary-500">Gift Ideas</Link></li>
              <li><Link to="/deals" className="text-sm font-medium text-gray-900 hover:text-primary-700 dark:text-white dark:hover:text-primary-500">Today's Deals</Link></li>
              <li><Link to="/sell" className="text-sm font-medium text-gray-900 hover:text-primary-700 dark:text-white dark:hover:text-primary-500">Sell</Link></li>
            </ul>
          </div>

          {/* Cart & User */}
          <div className="flex items-center lg:space-x-2">

            {/* Cart Button */}
            <div className="relative">
              <button
                type="button"
                className="inline-flex items-center rounded-lg justify-center p-2 hover:bg-gray-100 dark:hover:bg-gray-700 text-sm font-medium leading-none text-gray-900 dark:text-white"
                onClick={() => setIsCartOpen(!isCartOpen)}
              >
                <span className="sr-only">Cart</span>
                <svg className="w-5 h-5 lg:me-1" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 4h1.5L9 16m0 0h8m-8 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm8 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm-8.5-3h9.25L19 7H7.312"/>
                </svg>
                <span className="hidden sm:flex">My Cart</span>
                <svg className="hidden sm:flex w-4 h-4 text-gray-900 dark:text-white ms-1" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="m19 9-7 7-7-7"/>
                </svg>
              </button>

              {/* Cart Dropdown */}
              {isCartOpen && (
                <div className="absolute right-0 z-10 mt-2 w-80 bg-white dark:bg-gray-800 rounded-lg shadow-lg p-4 space-y-4">
                  <p className="text-gray-900 dark:text-white font-semibold">Your Cart is Empty</p>
                  {/* Add your cart items here */}
                </div>
              )}
            </div>

            {/* User Button */}
            <div className="relative">
              <button
                type="button"
                className="inline-flex items-center rounded-lg justify-center p-2 hover:bg-gray-100 dark:hover:bg-gray-700 text-sm font-medium leading-none text-gray-900 dark:text-white"
                onClick={() => setIsUserOpen(!isUserOpen)}
              >
                <span className="sr-only">Account</span>
                Account
                <svg className="w-4 h-4 text-gray-900 dark:text-white ms-1" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="m19 9-7 7-7-7"/>
                </svg>
              </button>

              {/* User Dropdown */}
              {isUserOpen && (
                <div className="absolute right-0 z-10 mt-2 w-56 bg-white dark:bg-gray-700 rounded-lg shadow-lg p-2 divide-y divide-gray-200 dark:divide-gray-600">
                  <ul className="text-sm text-gray-900 dark:text-white">
                    <li><Link to="/account" className="block px-3 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 rounded-md">My Account</Link></li>
                    <li><Link to="/orders" className="block px-3 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 rounded-md">My Orders</Link></li>
                    <li><Link to="/settings" className="block px-3 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 rounded-md">Settings</Link></li>
                    <li><Link to="/signout" className="block px-3 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 rounded-md">Sign Out</Link></li>
                  </ul>
                </div>
              )}
            </div>

            {/* Mobile menu toggle */}
            <button
              type="button"
              className="inline-flex lg:hidden items-center justify-center hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md p-2 text-gray-900 dark:text-white"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              <span className="sr-only">Open Menu</span>
              <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 7h14M5 12h14M5 17h14"/>
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="bg-gray-50 dark:bg-gray-700 dark:border-gray-600 border border-gray-200 rounded-lg py-3 px-4 mt-4 lg:hidden">
            <ul className="space-y-3 text-gray-900 dark:text-white text-sm font-medium">
              <li><Link to="/home" className="hover:text-primary-700 dark:hover:text-primary-500">Home</Link></li>
              <li><Link to="/best-sellers" className="hover:text-primary-700 dark:hover:text-primary-500">Best Sellers</Link></li>
              <li><Link to="/gift-ideas" className="hover:text-primary-700 dark:hover:text-primary-500">Gift Ideas</Link></li>
              <li><Link to="/deals" className="hover:text-primary-700 dark:hover:text-primary-500">Today's Deals</Link></li>
              <li><Link to="/sell" className="hover:text-primary-700 dark:hover:text-primary-500">Sell</Link></li>
            </ul>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
