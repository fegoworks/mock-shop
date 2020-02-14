import {
  User
} from '../../models';

const permissions = {
  async adminOnly(req, res, next) {
    const {
      id
    } = req;
    const {
      isAdmin
    } = await User.findByPk(id);
    if (isAdmin) {
      return next();
    }
    return res.status(403).json({
      status: 'Request failed',
      error: 'Unauthorized Access',
    });
  },
};

export default permissions;