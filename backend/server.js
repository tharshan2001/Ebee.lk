import dotenv from "dotenv";
dotenv.config(); // MUST be first

import express from "express";
import passport from "./utils/passport.js"; // passport now sees env vars
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import cookieParser from "cookie-parser";
import cors from "cors";

// Connect to MongoDB
connectDB();

const app = express();
app.use(express.json());
app.use(cookieParser());

// Enable CORS for frontend
app.use(cors({
  origin: "http://localhost:6001",
  credentials: true,
}));

// Initialize Passport
app.use(passport.initialize());

// Routes
app.use("/api/auth", authRoutes);
app.
// Test route
app.get("/", (req, res) => res.send("🚀 Server running"));

// Error handling
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: "Something broke!" });
});

const PORT = process.env.PORT || 8001;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
