const user = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    userId: {
      type: DataTypes.STRING,
      required: true
    },
    firstName: {
      type: DataTypes.STRING,
      required: true
    },
    lastName: {
      type: DataTypes.STRING,
      required: true
    },
    email: {
      type: DataTypes.STRING,
      required: true
    },
    password: {
      type: DataTypes.STRING,
      required: true
    },
    isAdmin: {
      type: DataTypes.BOOLEAN,
      required: true
    }
  }, {});
  User.associate = (models) => {
    // associations can be defined here
    User.hasMany(models.Product, {
      foreignKey: 'productId'
    });

    // User.hasMany(models.Cart, {
    //   foreignKey: 'cartId'
    // });
  };
  return User;
};

export default user;