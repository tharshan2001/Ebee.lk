import express from "express";
import {
  createProduct,
  getProducts,
  getProductById,
  getProductBySlug,
  getTrendingProducts,
  updateProduct,
  deleteProduct,
} from "../controllers/productController.js";
import upload from "../utils/upload.js";

const router = express.Router();

// Create product (with images)
router.post("/", upload.array("images", 10), createProduct);

// Get all products
router.get("/", getProducts);

// Get trending products
router.get("/trending", getTrendingProducts);

// Get product by slug
router.get("/slug/:slug", getProductBySlug);

// Get product by ID
router.get("/:id", getProductById);

// Update product by ID
router.put("/:id", updateProduct);

// Delete product by ID
router.delete("/:id", deleteProduct);

export default router;
