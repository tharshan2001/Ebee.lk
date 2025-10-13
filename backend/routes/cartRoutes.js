import express from "express";
import { 
  getCart, 
  addToCart, 
  updateCartItem, 
  removeCartItem, 
  clearCart,
  reduceCartItem
} from "../controllers/cartController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

// Get cart
router.get("/", protect, getCart);

// Add to cart
router.post("/add", protect, addToCart);

// Update quantity
router.put("/update", protect, updateCartItem);

// Reduce quantity by 1
router.put("/reduce/:productId", protect, reduceCartItem);

// Remove item
router.delete("/remove/:productId", protect, removeCartItem);

// Clear cart
router.delete("/clear", protect, clearCart);

export default router;
