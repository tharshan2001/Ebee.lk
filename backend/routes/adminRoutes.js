import express from "express";
import {
  registerAdmin,
  loginAdmin,
  getAdminProfile,
  logoutAdmin,
} from "../controllers/adminController.js";
import { protectAdmin } from "../middleware/authMiddleware.js";

const router = express.Router();

// Public routes
router.post("/register", registerAdmin);
router.post("/login", loginAdmin);

// Protected admin-only routes
router.get("/profile", protectAdmin, getAdminProfile);
router.post("/logout", protectAdmin, logoutAdmin);

export default router;
