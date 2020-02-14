import Joi from '@hapi/joi';

const validator = {
  validateBody: (schema) => (req, res, next) => {
    const result = schema.validate(req.body);
    if (result.error) {
      return res
        .json({
          status: 400,
          error: result.error.message,
        })
        .status(400);
    }

    req.body = result.value;
    return next();
  },

  schemas: {
    authSchema: Joi.object().keys({
      firstName: Joi.string()
        .regex(/^[a-zA-Z]*$/)
        .required()
        .trim()
        .lowercase()
        .error(new Error('First Name is required')),
      lastName: Joi.string()
        .regex(/^[a-zA-Z\\-]*$/)
        .required()
        .trim()
        .lowercase()
        .error(new Error('Last Name is required')),
      email: Joi.string()
        .email()
        .required()
        .trim()
        .lowercase()
        .error(new Error('A valid email address is required')),
      password: Joi.string()
        .required()
        .error(new Error('Password is required')),
      isAdmin: Joi.string()
        .required()
        .trim()
        .lowercase()
        .valid('true', 'false')
        .error(new Error('Value must either be true or false')),
    }),
    authLoginSchema: Joi.object().keys({
      email: Joi.string()
        .regex(/\S+@\S+\.\S+/)
        .required()
        .trim()
        .lowercase()
        .error(new Error('A valid email address is required')),
      password: Joi.string()
        .required()
        .error(new Error('Password is required')),
    }),
    productSchema: Joi.object().keys({
      name: Joi.string()
        .required()
        .trim()
        .lowercase()
        .error(new Error('A product name is required')),
      description: Joi.string()
        .required()
        .trim()
        .lowercase()
        .error(new Error('Product description is required')),
      category: Joi.string()
        .required()
        .trim()
        .lowercase()
        .error(new Error('Product category is required')),
      price: Joi.number()
        .required()
        .error(new Error('Product price is required')),
      inStock: Joi.boolean()
        .required()
        .error(new Error('A boolean value is required')),
    }),
    cartSchema: Joi.object().keys({

    }),
  },
};

export default validator;