import express from 'express';
import auth from '../middlewares/auth/auth.middleware';
import CartController from '../controllers/cart.controller';

const router = express.Router();

router.post('/carts/:productId',
  auth.verify,
  CartController.addToCart);

router.get('/carts/',
  auth.verify,
  CartController.viewCart);

export default router;