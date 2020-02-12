/* eslint-disable indent */
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { uuid } from 'uuidv4';
import { User } from '../models';

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
      const { firstName, lastName, email, password, isAdmin } = req.body;

      // Check if email exists
      const emailExists = await User.findOne({
        where: {
          email,
        },
      });

      if (emailExists) {
        return res.status(409).json({
          status: 'Request failed',
          error: 'An account with this email already exists',
        });
      }

      let admin;
      if (isAdmin === 'false') {
        admin = false;
      } else if (isAdmin === 'true') {
        admin = true;
      }

      const hashedPassword = bcrypt.hashSync(password, 10);

      const user = await User.create({
        userId: uuid(),
        firstName,
        lastName,
        email,
        password: hashedPassword,
        isAdmin: admin,
      });

      return res.status(201).json({
        status: 'success',
        data: {
          message: 'User account successfully created',
          userId: user.userId,
        },
      });
    } catch (error) {
      return res.status(500).json({
        status: 'Request Failed',
        error: error.message,
      });
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
      const { email, password } = req.body;

      // Check if email exists
      const isUser = await User.findOne({
        where: {
          email,
        },
      });

      if (!isUser) {
        return res.status(404).json({
          status: 'Request failed',
          error: 'An account with this email does not exist',
        });
      }

      // Compare password with what's stored in the database
      const isMatch = bcrypt.compareSync(password, isUser.password);
      if (!isMatch) {
        return res.status(401).json({
          status: 'Request failed',
          error: 'Wrong Password',
        });
      }

      // Generate token
      const token = jwt.sign(
        {
          id: isUser.userid,
          isAdmin: isUser.isAdmin,
        },
        process.env.SECRET,
        {
          expiresIn: '1h', // expires in 1 hour
        }
      );

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
      return res.status(500).json({
        status: 'Request Failed',
        error: error.message,
      });
    }
  }
}

export default UserController;
