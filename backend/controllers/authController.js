import User from "../models/User.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

// Generate JWT
const generateToken = (id) =>
  jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "1d" });

// Helper to send cookie with token
const sendToken = (res, token) => {
  res
    .cookie("token", token, {
      httpOnly: true, // prevents JS access (XSS protection)
      secure: process.env.NODE_ENV === "production", // only HTTPS in prod
      sameSite: "lax", // helps with CSRF
      maxAge: 24 * 60 * 60 * 1000, // 1 day
    })
    .status(200)
    .json({ msg: "Authentication successful" });
};

// Register
export const register = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    let user = await User.findOne({ email });
    if (user) return res.status(400).json({ msg: "User already exists" });

    // hash password before saving
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    user = await User.create({ name, email, password: hashedPassword });

    // generate JWT
    const token = generateToken(user._id);

    // set JWT in cookie
    sendToken(res, token);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Login
export const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ msg: "Invalid credentials" });

    // compare password with hashed password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ msg: "Invalid credentials" });

    // generate JWT
    const token = generateToken(user._id);

    // set JWT in cookie
    sendToken(res, token);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Logout
export const logout = async (req, res) => {
  try {
    res.clearCookie("token", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
    });
    res.status(200).json({ msg: "Logged out successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
