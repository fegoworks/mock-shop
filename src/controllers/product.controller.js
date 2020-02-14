/* eslint-disable indent */
import {
  Product
} from '../models';
import {
  handleErrorResponse,
  handleSuccessResponse,
  cloudLink,
  unLink
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

      const uploadedBy = req.id;

      const product = await Product.create({
        name,
        description,
        category,
        price,
        imageUrl: url.url,
        imageName: url.id,
        inStock,
        uploadedBy
      });
      return handleSuccessResponse(res, product, 201);
    } catch (error) {
      return handleErrorResponse(res, error.message, 403);
    }
  }

  /**
   * @description Edit product method
   * @static
   * @param {object} req
   * @param {object} res
   * @returns {object} Product
   * @member ProductController
   */
  static async editProduct(req, res) {
    try {
      const {
        productId: id
      } = req.params;
      const uploadedBy = req.id;
      const {
        name,
        description,
        category,
        price,
        inStock
      } = req.body;

      const found = await Product.findByPk(id);

      if (!found) {
        return handleErrorResponse(res, 'Product not found', 404);
      }
      // Delete old product image
      await unLink(found.imageName);

      // Upload new product image
      if (req.file === undefined) {
        return handleErrorResponse(res, 'Err: No file selected', 500);
      }
      const url = await cloudLink(req.file);
      await Product.update({
        name,
        description,
        category,
        price,
        imageUrl: url.url,
        imageName: url.id,
        inStock,
        uploadedBy
      }, {
        where: {
          id
        }
      });

      return res.status(200).json({
        status: 'success',
        message: 'Product updated successfully',
      });
    } catch (error) {
      return handleErrorResponse(res, error.message, 403);
    }
  }

  // /**
  //  * @description Get all products
  //  * @static
  //  * @param {object} req
  //  * @param {object} res
  //  * @returns {object} products
  //  * @member ProductController
  //  */
  // static async getProducts(req, res) {
  //   try {
  //     const products = await Product.findAll();
  //     return handleSuccessResponse(res, products);
  //   } catch (error) {
  //     return handleErrorResponse(res, error.message, 500);
  //   }
  // }

  // /**
  //  * @description Delete product
  //  * @static
  //  * @param {object} req
  //  * @param {object} res
  //  * @returns {null} void
  //  * @member ProductController
  //  */
  // static async deleteProduct(req, res) {
  //   try {
  //     const {
  //       productId: id
  //     } = req.params;

  //     const product = await Product.findByPk(id);
  //     if (!product) {
  //       return handleErrorResponse(res, 'Product not found', 404);
  //     }

  //     await Product.destroy({
  //       where: {
  //         id
  //       }
  //     });
  //     return res.status(204).json({
  //       status: 'success',
  //       message: 'product deleted successfully',
  //     });
  //   } catch (error) {
  //     return handleErrorResponse(res, error.message, 500);
  //   }
  // }
}

export default ProductController;