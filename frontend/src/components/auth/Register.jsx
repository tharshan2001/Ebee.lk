// src/components/Register.jsx
import React, { useState } from "react";

// Use the env variable for backend
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

const Register = () => {
  const [name, setName] = useState(""); // ✅ new state for name
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // Normal registration
  const handleRegister = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert("❌ Passwords do not match");
      return;
    }

    try {
      const res = await fetch(`${BACKEND_URL}/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }), // ✅ include name
        credentials: "include",
      });

      const data = await res.json();
      if (res.ok) {
        alert("✅ Registration successful");
        console.log(data);
      } else {
        alert(data.msg || data.error);
      }
    } catch (err) {
      alert("❌ Registration failed: " + err.message);
    }
  };

  // Google OAuth registration
  const handleGoogleRegister = () => {
    window.location.href = `${BACKEND_URL}/auth/google`;
  };

  return (
    <div className="h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white rounded-lg shadow-lg p-10 w-full max-w-md">
        <h3 className="text-3xl font-bold text-center mb-4">Register</h3>
        <p className="text-center mb-6 text-gray-600">Create your account</p>

        {/* Google registration */}
        <button
          onClick={handleGoogleRegister}
          className="flex items-center justify-center w-full py-3 mb-6 text-sm font-medium text-gray-900 bg-gray-200 rounded-lg hover:bg-gray-300 transition"
        >
          <img
            src="https://raw.githubusercontent.com/Loopple/loopple-public-assets/main/motion-tailwind/img/logos/logo-google.png"
            className="h-5 mr-2"
            alt="Google Logo"
          />
          Sign up with Google
        </button>

        <div className="flex items-center mb-4">
          <hr className="border-gray-400 grow" />
          <span className="mx-2 text-gray-600">or</span>
          <hr className="border-gray-400 grow" />
        </div>

        <form onSubmit={handleRegister} className="flex flex-col">
          <input
            type="text"
            placeholder="Full Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-4 py-2 mb-4 rounded-lg border focus:outline-none focus:ring-2 focus:ring-[#FFC512]"
            required
          />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-2 mb-4 rounded-lg border focus:outline-none focus:ring-2 focus:ring-[#FFC512]"
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-2 mb-4 rounded-lg border focus:outline-none focus:ring-2 focus:ring-[#FFC512]"
            required
          />
          <input
            type="password"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="w-full px-4 py-2 mb-4 rounded-lg border focus:outline-none focus:ring-2 focus:ring-[#FFC512]"
            required
          />
          <button
            type="submit"
            className="w-full py-2 bg-[#FFC512] text-white rounded-lg hover:bg-[#e6b800] transition"
          >
            Register
          </button>
        </form>

        <p className="text-center text-sm text-gray-500 mt-4">
          Already have an account?{" "}
          <a href="/login" className="text-[#FFC512] font-semibold hover:underline">
            Sign In
          </a>
        </p>
      </div>
    </div>
  );
};

export default Register;
