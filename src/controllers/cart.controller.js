/* eslint-disable indent */
import {
  Cart,
  Product
} from '../models';
import {
  handleErrorResponse,
  handleSuccessResponse,
} from '../helpers/utils';

/**
 * @description Cart Controller
 * @class CartController
 */
class CartController {
  /**
   * @description Add cart method
   * @static
   * @param {object} req
   * @param {object} res
   * @returns {object} Cart
   * @member CartController
   */
  static async addToCart(req, res) {
    try {
      const {
        productId
      } = req.params;
      const userId = req.id;
      const found = await Product.findByPk(productId);
      if (!found) {
        return handleErrorResponse(res, 'Product not found', 404);
      }
      if (found.inStock === false) {
        return handleErrorResponse(res, 'Product is out of stock', 404);
      }
      const cart = await Cart.create({
        productId,
        userId
      });
      return handleSuccessResponse(res, cart, 201);
    } catch (error) {
      return handleErrorResponse(res, error.message, 500);
    }
  }

  /**
   * @description View cart method
   * @static
   * @param {object} req
   * @param {object} res
   * @returns {object} Cart
   * @member CartController
   */
  static async viewCart(req, res) {
    try {
      const userId = req.id;

      const productsInCart = await Cart.findAll({
        where: {
          userId
        }
      }).map((el) => el.get({
        plain: true
      }));

      if (productsInCart.length < 0) {
        return handleErrorResponse(res, 'Cart is empty', 400);
      }

      // let totalPrice = 0;
      // productsInCart.forEach((item) => {
      //   const price = Promise.resolve(Product.findByPk(item.id));
      //   totalPrice += price;
      // });

      const data = {
        productsInCart,
        // Amount: totalPrice
      };
      return handleSuccessResponse(res, data, 200);
    } catch (error) {
      return handleErrorResponse(res, error.message, 500);
    }
  }

  /**
   * @description Delete product in cart
   * @static
   * @param {object} req
   * @param {object} res
   * @returns {null} void
   * @member CartController
   */
  static async deleteFromCart(req, res) {
    try {
      const {
        productId
      } = req.params;

      const item = await Cart.findOne({
        where: {
          productId
        }
      });
      if (!item) {
        return handleErrorResponse(res, 'Product not found in cart', 404);
      }

      // Check if cart is owned by user
      if (item.userId !== req.id) {
        return handleErrorResponse(res, 'Unauthorized access', 403);
      }

      await Cart.destroy({
        where: {
          productId
        }
      });
      return res.status(204).json({
        status: 'success',
        message: 'product deleted successfully',
      });
    } catch (error) {
      return handleErrorResponse(res, error.message, 500);
    }
  }
}


export default CartController;