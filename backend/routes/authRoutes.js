import express from "express";
import passport from "../utils/passport.js";
import jwt from "jsonwebtoken";
import { login, register, logout } from "../controllers/authController.js";

const router = express.Router();

// Normal auth
router.post("/register", register);
router.post("/login", login);
router.post("/logout", logout); // added logout here

// Google OAuth
router.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

const FRONTEND_URL = process.env.FRONTEND_URL || "http://localhost:6001/home";

router.get(
  "/google/callback",
  passport.authenticate("google", { failureRedirect: `${FRONTEND_URL}/login`, session: false }),
  (req, res) => {
    const token = jwt.sign({ id: req.user._id }, process.env.JWT_SECRET, { expiresIn: "1d" });
    res
      .cookie("token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        maxAge: 24 * 60 * 60 * 1000,
      })
      .redirect(FRONTEND_URL);
  }
);

export default router;
