import bcrypt from 'bcryptjs';
import {
  uuid
} from 'uuidv4';
import {
  User
} from '../models';

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
   * @returns User
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
        isAdmin: admin
      });

      return res.status(201).json({
        status: 'success',
        data: user
      });
    } catch (error) {
      return res.status(500).json({
        status: 'Request Failed',
        error: error.message
      });
    }
  }
}

export default UserController;