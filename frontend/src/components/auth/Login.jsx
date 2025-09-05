// src/components/Login.jsx
import React, { useState } from "react";

// Use the env variable for backend
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Normal login
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`${BACKEND_URL}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
        credentials: "include",
      });

      const data = await res.json();
      if (res.ok) {
        alert(" Login successful");
        console.log(data);
      } else {
        alert(data.msg || data.error);
      }
    } catch (err) {
      alert("❌ Login failed: " + err.message);
    }
  };

  // Google OAuth login
  const handleGoogleLogin = () => {
    window.location.href = `${BACKEND_URL}/auth/google`;
  };

  return (
    <div className="p-30 flex items-center justify-center bg-gray-100">
      <div className="bg-white rounded-lg shadow-lg p-10 w-full max-w-md">
        <h3 className="text-3xl font-bold text-center mb-4">Sign In</h3>
        <p className="text-center mb-6 text-gray-600">Enter your email and password</p>

        {/* Google login */}
        <button
          onClick={handleGoogleLogin}
          className="flex items-center justify-center w-full py-3 mb-6 text-sm font-medium text-gray-900 bg-gray-200 rounded-lg hover:bg-gray-300 transition"
        >
          <img
            src="https://raw.githubusercontent.com/Loopple/loopple-public-assets/main/motion-tailwind/img/logos/logo-google.png"
            className="h-5 mr-2"
            alt="Google Logo"
          />
          Sign in with Google
        </button>

        <div className="flex items-center mb-4">
          <hr className="border-gray-400 grow" />
          <span className="mx-2 text-gray-600">or</span>
          <hr className="border-gray-400 grow" />
        </div>

        <form onSubmit={handleLogin} className="flex flex-col">
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
          <button
            type="submit"
            className="w-full py-2 bg-[#FFC512] text-white rounded-lg hover:bg-[#e6b800] transition"
          >
            Sign In
          </button>
        </form>

        <p className="text-center text-sm text-gray-500 mt-4">
          Not registered yet?{" "}
          <a href="/register" className="text-[#FFC512] font-semibold hover:underline">
            Create an Account
          </a>
        </p>
      </div>
    </div>
  );
};

export default Login;
