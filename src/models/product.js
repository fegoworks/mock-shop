const product = (sequelize, DataTypes) => {
  const Product = sequelize.define('Product', {
    ProductId: {
      type: DataTypes.STRING,
      required: true
    },
    name: {
      type: DataTypes.STRING,
      required: true
    },
    description: {
      type: DataTypes.STRING,
      required: true
    },
    category: {
      type: DataTypes.STRING,
      required: true
    },
    price: {
      type: DataTypes.FLOAT,
      required: true
    },
    imageUrl: {
      type: DataTypes.STRING,
      required: true
    },
    inStock: {
      type: DataTypes.BOOLEAN,
      required: true
    }
  }, {});
  Product.associate = (models) => {
    // associations can be defined here
    Product.belongsTo(models.User, {
      foreignKey: 'userId'
    });

    // Product.hasMany(models.Cart, {
    //   foreignKey: 'cartId'
    // });
  };
  return Product;
};

export default product;