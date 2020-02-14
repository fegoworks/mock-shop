import express from 'express';
import productController from '../controllers/product.controller';
import auth from '../middlewares/auth/auth.middleware';
import permissions from '../middlewares/auth/role.middleware';
import upload from '../middlewares/multer';
import validate from '../helpers/validator';

const router = express.Router();

router.post('/products/',
  auth.verify,
  permissions.adminOnly,
  validate.validateBody(validate.schemas.productSchema),
  productController.addProduct);

router.patch('/products/:productId',
  auth.verify,
  permissions.adminOnly,
  validate.validateBody(validate.schemas.productSchema),
  productController.editProduct);

router.patch('/products/:productId/upload',
  auth.verify,
  permissions.adminOnly,
  upload.single('image'),
  productController.uploadProductImage);

router.get('/products',
  auth.verify,
  productController.getProducts);

router.delete('/products/:productId',
  auth.verify,
  permissions.adminOnly,
  productController.deleteProduct);

export default router;