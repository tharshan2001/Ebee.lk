// App.jsx
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext.jsx";
import { AddressProvider } from "./context/AddressContext.jsx";
import { CartProvider } from "./context/CartContext.jsx";
import Navbar from "./components/common/Navbar";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import HomePage from "./pages/HomePage";
import CartPage from "./pages/CartPage.jsx";
import CheckoutPage from "./pages/CheckoutPage.jsx";
import MyAccount from "./components/user/MyAccount.jsx";
import ProductView from "./components/product/ProductView.jsx";

const App = () => {
  return (
    <AuthProvider>
      <AddressProvider>
        <CartProvider>
          <Router>
          <Navbar /> {/* Navbar outside Routes */}
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<HomePage />} />
            <Route path="/product/:slug" element={<ProductView/>} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/checkout" element={<CheckoutPage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />

            {/* Protected / Account Routes */}
            <Route path="/account" element={<MyAccount/>} />

            {/* Default fallback */}
            <Route path="*" element={<Login />} />
          </Routes>
          </Router>
        </CartProvider>
      </AddressProvider>
    </AuthProvider>
  );
};

export default App;
