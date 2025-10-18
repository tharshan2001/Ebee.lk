import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faInstagram, faYoutube, faCcVisa, faCcMastercard, faCcPaypal } from '@fortawesome/free-brands-svg-icons';

const Footer = () => {
  return (
    <footer className="bg-black text-white">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-yellow-400 rounded-lg flex items-center justify-center">
                <span className="text-black font-bold text-lg">E</span>
              </div>
              <span className="text-2xl font-bold">Ebee.lk</span>
            </div>
            <p className="text-gray-300 text-sm">
              No 498 Galle Road,<br />
              Colombo 03, Sri Lanka.
            </p>
            <div className="space-y-2">
              <p className="text-sm text-gray-300">HOTLINE</p>
              <p className="text-yellow-400 font-semibold text-lg">+94 112 222 888</p>
            </div>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-300 hover:text-yellow-400 transition-colors">
                <FontAwesomeIcon icon={faFacebook} className="w-8 h-8" />
              </a>
              <a href="#" className="text-gray-300 hover:text-yellow-400 transition-colors">
                <FontAwesomeIcon icon={faInstagram} className="w-8 h-8" />
              </a>
              <a href="#" className="text-gray-300 hover:text-yellow-400 transition-colors">
                <FontAwesomeIcon icon={faYoutube} className="w-8 h-8" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-yellow-400">Quick Links</h3>
            <div className="space-y-2">
              <button className="flex items-center space-x-2 text-gray-300 hover:text-yellow-400 transition-colors">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
                <span>Showroom Locator</span>
              </button>
              <button className="flex items-center space-x-2 text-gray-300 hover:text-yellow-400 transition-colors">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
                <span>Showroom Login</span>
              </button>
              <button className="flex items-center space-x-2 text-gray-300 hover:text-yellow-400 transition-colors">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <span>Service Center Locator</span>
              </button>
              <button className="flex items-center space-x-2 text-gray-300 hover:text-yellow-400 transition-colors">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                <span>Track your Order</span>
              </button>
            </div>
          </div>

          {/* About */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-yellow-400">About</h3>
            <div className="space-y-2">
              <a href="#" className="block text-gray-300 hover:text-yellow-400 transition-colors">About Us</a>
              <a href="#" className="block text-gray-300 hover:text-yellow-400 transition-colors">Careers</a>
              <a href="#" className="block text-gray-300 hover:text-yellow-400 transition-colors">Contact Us</a>
              <a href="#" className="block text-gray-300 hover:text-yellow-400 transition-colors">Subscribe Newsletter</a>
            </div>
          </div>

          {/* Help & Policies */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-yellow-400">Help & Policies</h3>
            <div className="space-y-2">
              <a href="#" className="block text-gray-300 hover:text-yellow-400 transition-colors">Frequently Asked Questions</a>
              <a href="#" className="block text-gray-300 hover:text-yellow-400 transition-colors">How To Buy</a>
              <a href="#" className="block text-gray-300 hover:text-yellow-400 transition-colors">Shipping & Delivery</a>
              <a href="#" className="block text-gray-300 hover:text-yellow-400 transition-colors">Warranty Information</a>
              <a href="#" className="block text-gray-300 hover:text-yellow-400 transition-colors">Return Products</a>
              <a href="#" className="block text-gray-300 hover:text-yellow-400 transition-colors">Privacy Policy</a>
              <a href="#" className="block text-gray-300 hover:text-yellow-400 transition-colors">Return and Refund Policy</a>
              <a href="#" className="block text-gray-300 hover:text-yellow-400 transition-colors">Terms and Conditions</a>
            </div>
          </div>
        </div>

        {/* Bottom Footer */}
        <div className="border-t border-gray-700 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm">
            © 2025 Ebee.lk. All rights reserved.
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <FontAwesomeIcon icon={faCcVisa} className="h-10 text-gray-400 hover:text-yellow-400 transition-colors cursor-pointer" />
            <FontAwesomeIcon icon={faCcMastercard} className="h-10 text-gray-400 hover:text-yellow-400 transition-colors cursor-pointer" />
            <FontAwesomeIcon icon={faCcPaypal} className="h-10 text-gray-400 hover:text-yellow-400 transition-colors cursor-pointer" />
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;