/* eslint-disable indent */
import {
  uuid
} from 'uuidv4';
import {
  User
} from '../models';
import {
  generateToken,
  handleErrorResponse,
  handleSuccessResponse,
  hashPassword,
  comparePassword,
  checkAdmin
} from '../helpers/utils';

/**
 * @description User Controller
 * @class UserController
 */
class UserController {
  /**
   * @description Sign up method
   * @static
   * @param {object} req
   * @param {object} res
   * @returns {object} User
   * @member UserController
   */
  static async createUser(req, res) {
    try {
      const {
        firstName,
        lastName,
        email,
        password,
        isAdmin
      } = req.body;

      // Check if email exists
      const emailExists = await User.findOne({
        where: {
          email,
        },
      });

      if (emailExists) {
        const error = 'An account with this email already exists';
        return handleErrorResponse(res, error, 409);
      }

      const admin = checkAdmin(isAdmin);

      const hash = hashPassword(password);

      const user = await User.create({
        userId: uuid(),
        firstName,
        lastName,
        email,
        password: hash,
        isAdmin: admin,
      });

      const data = {
        message: 'User account successfully created',
        userId: user.userId,
      };
      return handleSuccessResponse(res, data, 201);
    } catch (error) {
      return handleErrorResponse(res, error.message, 500);
    }
  }

  /**
   * @description Login method
   * @static
   * @param {object} req
   * @param {object} res
   * @returns {object} User
   * @member UserController
   */
  static async signIn(req, res) {
    try {
      const {
        email,
        password
      } = req.body;

      // Check if email exists
      const isUser = await User.findOne({
        where: {
          email,
        },
      });

      if (!isUser) {
        const error = 'This email does not exist';
        return handleErrorResponse(res, error, 404);
      }

      // Compare password with what's stored in the database
      const isMatch = comparePassword(password, isUser.password);
      if (!isMatch) {
        return handleErrorResponse(res, 'Wrong Password', 401);
      }

      // Generate token
      const payload = {
        id: isUser.userid,
        isAdmin: isUser.isAdmin,
      };
      const token = generateToken(payload);

      res.cookie('access_token', token, {
        maxAge: 60 * 60 * 1000, // 1 hour
        httpOnly: true,
        secure: true,
        sameSite: true,
      });

      return res.status(200).json({
        status: 'success',
        message: `Welcome ${isUser.firstName}`,
        data: {
          token,
          userId: isUser.userId,
          firstName: isUser.firstName,
          lastName: isUser.lastName,
          email: isUser.email,
        },
      });
    } catch (error) {
      return handleErrorResponse(res, error.message, 500);
    }
  }
}

export default UserController;