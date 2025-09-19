import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import Navbar from "./components/common/Navbar";
import Product from "./components/products/Product";
import HomePage from "./pages/HomePage";

const App = () => {
  return (
    <Router>
      <Navbar /> {/* Render Navbar outside of Routes */}
      <Routes>
        <Route path="/home" element={<HomePage/>} />
        <Route path="/product" element={<Product/>} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="*" element={<Login />} /> {/* Default route */}
      </Routes>
    </Router>
  );
};

export default App;
