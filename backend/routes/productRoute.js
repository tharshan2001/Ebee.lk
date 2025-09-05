import express from 'express';
import { createProduct, getProducts, getProductById, updateProduct, deleteProduct } from '../controllers/productController.js';
import passport from '../utils/passport.js';

const router = express.Router();

// Create a new product (protected route)
router.post('/', passport.authenticate('jwt', { session: false }), createProduct);

// Get all products
router.get('/', getProducts);

// Get a product by ID
router.get('/:id', getProductById);

// Update a product by ID (protected route)
router.put('/:id', passport.authenticate('jwt', { session: false }), updateProduct);

// Delete a product by ID (protected route)
router.delete('/:id', passport.authenticate('jwt', { session: false }), deleteProduct);

export default router;
