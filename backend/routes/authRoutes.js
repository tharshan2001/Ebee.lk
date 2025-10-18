import express from "express";
import jwt from "jsonwebtoken";
import passport from "../utils/passport.js";
import { login, register, logout, getMe } from "../controllers/authController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

// Normal auth
router.post("/register", register);
router.post("/login", login);
router.post("/logout", logout);
router.get("/me", protect, getMe);

// Google OAuth
if (process.env.ENABLE_GOOGLE_AUTH === "true") {
  const FRONTEND_URL = process.env.FRONTEND_URL || "http://localhost:8090"; // fallback URL

  // Step 1: Start Google OAuth login
  router.get(
    "/google",
    passport.authenticate("google", { scope: ["profile", "email"] })
  );

  // Step 2: Google redirects here after login
  router.get(
    "/google/callback",
    passport.authenticate("google", { failureRedirect: `${FRONTEND_URL}/login`, session: false }),
    (req, res) => {
      if (!req.user) {
        return res.redirect(`${FRONTEND_URL}/login`);
      }

      // Create JWT
      const token = jwt.sign({ id: req.user._id }, process.env.JWT_SECRET, { expiresIn: "1d" });

      // Set cookie and redirect to frontend
      res
        .cookie("token", token, {
          httpOnly: true,
          secure: process.env.NODE_ENV === "production",
          sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
          maxAge: 24 * 60 * 60 * 1000,
        })
        .redirect(FRONTEND_URL);
    }
  );
}

export default router;
