/* eslint-disable indent */
import {
  uuid
} from 'uuidv4';
import {
  Product
} from '../models';
import {
  handleErrorResponse,
  handleSuccessResponse,
  cloudLink
} from '../helpers/utils';


/**
 * @description Product Controller
 * @class ProductController
 */
class ProductController {
  /**
   * @description Add product method
   * @static
   * @param {object} req
   * @param {object} res
   * @returns {object} Product
   * @member ProductController
   */
  static async addProduct(req, res) {
    try {
      const {
        name,
        description,
        category,
        price,
        inStock
      } = req.body;

      if (req.file === undefined) {
        return handleErrorResponse(res, 'Err: No file selected', 500);
      }
      const url = await cloudLink(req.file);
      const imageLink = url.url;
      const product = await Product.create({
        productId: uuid(),
        name,
        description,
        category,
        price,
        imageUrl: imageLink,
        inStock
      });
      return handleSuccessResponse(res, product, 201);
    } catch (error) {
      return handleErrorResponse(res, error.message, 403);
    }
  }
}

export default ProductController;