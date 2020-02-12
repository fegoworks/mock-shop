import express from 'express';
import productController from '../controllers/product.controller';
import auth from '../middlewares/auth/auth.middleware';
import permissions from '../middlewares/auth/role.middleware';
import upload from '../middlewares/multer';

const router = express.Router();

router.post('/products/',
  auth.verify,
  permissions.adminOnly,
  upload.single('image'),
  productController.addProduct);


export default router;