import express from "express";
import {
  createOrder,
  getOrderById,
  getMyOrders,
  getOrders,
  updateOrderToPaid,
  updateOrderToDelivered,
  updateOrderStatus,
  cancelOrder,
} from "../controllers/orderController.js";
import { protect, admin } from "../middleware/authMiddleware.js";

const router = express.Router();

// Create new order
router.post("/", protect, createOrder);

// Get logged in user orders
router.get("/myorders", protect, getMyOrders);

// Get all orders (Admin only)
router.get("/", protect, admin, getOrders);

// Get order by ID
router.get("/:id", protect, getOrderById);

// Update order to paid
router.put("/:id/pay", protect, updateOrderToPaid);

// Update order to delivered (Admin only)
router.put("/:id/deliver", protect, admin, updateOrderToDelivered);

// Update order status (Admin only)
router.put("/:id/status", protect, admin, updateOrderStatus);

// Cancel order
router.put("/:id/cancel", protect, cancelOrder);

export default router;
