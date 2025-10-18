import jwt from "jsonwebtoken";
import User from "../models/User.js";
import Admin from "../models/Admin.js";

// Middleware to protect normal user routes
export const protect = async (req, res, next) => {
  try {
    const token = req.cookies.token;

    if (!token) {
      return res.status(401).json({ message: "Not authorized, no token" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await User.findById(decoded.id).select(
      "-passwordHash -securityPin"
    );

    if (!user) {
      return res.status(401).json({ message: "Not authorized, user not found" });
    }

    req.user = user; // attach user object
    next();
  } catch (error) {
    return res.status(401).json({ message: "Not authorized, token failed" });
  }
};

// Middleware to protect admin routes
export const protectAdmin = async (req, res, next) => {
  try {
    const adminToken = req.cookies.adminToken;

    if (!adminToken) {
      return res.status(401).json({ message: "Not authorized, no token" });
    }

    const decoded = jwt.verify(adminToken, process.env.JWT_SECRET);

    const admin = await Admin.findById(decoded.id).select("-password");

    if (!admin) {
      return res.status(401).json({ message: "Not authorized, admin not found" });
    }

    req.admin = admin; // better distinction: attach as req.admin instead of req.user
    next();
  } catch (error) {
    return res.status(401).json({ message: "Not authorized, token failed" });
  }
};

// Admin middleware for user routes (checks if user is admin)
export const admin = async (req, res, next) => {
  try {
    // First check if user is authenticated
    if (!req.user) {
      return res.status(401).json({ message: "Not authorized" });
    }

    // Check if user has admin privileges (you can modify this logic based on your User model)
    const adminUser = await Admin.findOne({ email: req.user.email });
    
    if (!adminUser) {
      return res.status(403).json({ message: "Not authorized as admin" });
    }

    req.user.isAdmin = true;
    next();
  } catch (error) {
    return res.status(401).json({ message: "Not authorized, admin check failed" });
  }
};
