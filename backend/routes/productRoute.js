import express from 'express';
import { 
  createProduct, 
  getProducts, 
  getProductById, 
  updateProduct, 
  deleteProduct 
} from '../controllers/productController.js';

const router = express.Router();

router.post('/', createProduct);
router.get('/', getProducts);
router.get('/:id', getProductById);
router.put('/:id', updateProduct);
router.delete('/:id', deleteProduct);


// Update a product by ID (protected route)
router.put('/:id', passport.authenticate('jwt', { session: false }), updateProduct);

// Delete a product by ID (protected route)
router.delete('/:id', passport.authenticate('jwt', { session: false }), deleteProduct);

export default router;

