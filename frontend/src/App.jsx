import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import Home from "./pages/Home";
import Product from "./pages/Product";
import Navbar from "./components/common/Navbar";

const App = () => {
  return (
    <Router>
      <Navbar /> 
      <Routes>
        <Route path="/" element={<Home />} /> {/* Home as default */}
        <Route path="/home" element={<Home />} />
        <Route path="/product/:id" element={<Product />} /> {/* Free product viewing */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="*" element={<Home />} /> 
      </Routes>
    </Router>
  );
};

export default App;
