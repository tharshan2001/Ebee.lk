import dotenv from "dotenv"; 
dotenv.config();

import express from "express";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import productRoutes from "./routes/productRoute.js";
import uploadRoutes from "./routes/uploadRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";
import cartRoutes from "./routes/cartRoutes.js";
import addressRoutes from "./routes/addressRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";
import passport from "./utils/passport.js";


// ✅ Connect to MongoDB
connectDB();

// ✅ Path setup
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// ✅ Initialize Express
const app = express();

// ✅ Middleware
app.use(express.json());
app.use(cookieParser());
app.use(passport.initialize());


// ✅ CORS Configuration
const allowedOrigin = "http://localhost:8090";
app.use(
  cors({
    origin: (origin, callback) => {
      // allow non-browser clients (no origin) and the specific frontend origin
      if (!origin || origin === allowedOrigin) return callback(null, true);
      return callback(new Error("Not allowed by CORS"));
    },
    credentials: true,
  })
);

// Ensure credentials header is always present and origin is echoed
app.use((req, res, next) => {
  const origin = req.headers.origin;
  if (origin === allowedOrigin) {
    res.header("Access-Control-Allow-Origin", origin);
    res.header("Access-Control-Allow-Credentials", "true");
    res.header("Vary", "Origin");
  }
  next();
});

// Preflight handling is automatically done by cors(); avoid wildcard patterns on Express 5

// ✅ Serve uploaded files statically
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// ✅ API Routes
app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);
app.use("/api/files", uploadRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/address", addressRoutes);
app.use("/api/orders", orderRoutes);

// ✅ Root test route
app.get("/", (req, res) => {
  res.send("🚀 Server is running and CORS is configured correctly!");
});

// ✅ Global error handler
app.use((err, req, res, next) => {
  console.error("❌ Error:", err.stack);
  res.status(500).json({ error: "Something broke on the server!" });
});

// ✅ Start server
const PORT = process.env.PORT || 8001;
app.listen(PORT, () => {
  console.log(`✅ Server running at: http://localhost:${PORT}`);
  console.log(`✅ Accepting requests from: ${allowedOrigin}`);
});
