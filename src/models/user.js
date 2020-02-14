const user = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      required: true,
      primaryKey: true
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
      foreignKey: 'id'
    });

    // User.hasMany(models.Cart, {
    //   foreignKey: 'cartId'
    // });
  };
  return User;
};

export default user;