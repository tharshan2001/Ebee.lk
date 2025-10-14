import Cart from "../models/Cart.js";
import User from "../models/User.js";
import jwt from "jsonwebtoken";

// Helper: get user ID from token
const getUserIdFromToken = (req) => {
  const token = req.cookies.token;
  if (!token) throw new Error("Not authenticated");
  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  return decoded.id;
};

// Get user's cart
export const getCart = async (req, res) => {
  try {
    const userId = getUserIdFromToken(req);

    let cart = await Cart.findOne({ user: userId }).populate("items.product");
    if (!cart) {
      cart = await Cart.create({ user: userId, items: [] });
      await User.findByIdAndUpdate(userId, { cart: cart._id });
    }

    res.status(200).json({ success: true, cart });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Add product to cart
export const addToCart = async (req, res) => {
  try {
    const userId = getUserIdFromToken(req);
    const { productId, quantity } = req.body;

    let cart = await Cart.findOne({ user: userId });
    if (!cart) {
      cart = await Cart.create({ user: userId, items: [] });
      await User.findByIdAndUpdate(userId, { cart: cart._id });
    }

    const existingItem = cart.items.find((item) => item.product.toString() === productId);
    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      cart.items.push({ product: productId, quantity });
    }

    await cart.save();
    res.status(200).json({ success: true, cart });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update quantity of a product
export const updateCartItem = async (req, res) => {
  try {
    const userId = getUserIdFromToken(req);
    const { productId, quantity } = req.body;

    let cart = await Cart.findOne({ user: userId });
    if (!cart) return res.status(404).json({ msg: "Cart not found" });

    const item = cart.items.find((i) => i.product.toString() === productId);
    if (!item) return res.status(404).json({ msg: "Item not found in cart" });

    item.quantity = quantity;
    await cart.save();

    res.status(200).json({ success: true, cart });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Remove product from cart
export const removeCartItem = async (req, res) => {
  try {
    const userId = getUserIdFromToken(req);
    const { productId } = req.params;

    let cart = await Cart.findOne({ user: userId });
    if (!cart) return res.status(404).json({ msg: "Cart not found" });

    cart.items = cart.items.filter((item) => item.product.toString() !== productId);
    await cart.save();

    res.status(200).json({ success: true, cart });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Clear entire cart
export const clearCart = async (req, res) => {
  try {
    const userId = getUserIdFromToken(req);

    let cart = await Cart.findOne({ user: userId });
    if (!cart) return res.status(404).json({ msg: "Cart not found" });

    cart.items = [];
    await cart.save();

    res.status(200).json({ success: true, cart });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


// Reduce quantity of a product by 1
export const reduceCartItem = async (req, res) => {
  try {
    const userId = getUserIdFromToken(req);
    const { productId } = req.params;

    let cart = await Cart.findOne({ user: userId });
    if (!cart) return res.status(404).json({ msg: "Cart not found" });

    const item = cart.items.find((i) => i.product.toString() === productId);
    if (!item) return res.status(404).json({ msg: "Item not found in cart" });

    // Reduce quantity, minimum 1
    item.quantity = Math.max(item.quantity - 1, 1);

    await cart.save();

    res.status(200).json({ success: true, cart });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
