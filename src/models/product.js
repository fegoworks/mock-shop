const product = (sequelize, DataTypes) => {
  const Product = sequelize.define('Product', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      required: true,
      primaryKey: true
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
      required: false
    },
    imageName: {
      type: DataTypes.STRING,
      required: false
    },
    inStock: {
      type: DataTypes.BOOLEAN,
      required: true
    },
    uploadedBy: {
      type: DataTypes.STRING,
      required: true,
      references: {
        model: 'Users',
        key: 'id',
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
    }
  }, {});
  Product.associate = (models) => {
    // associations can be defined here
    Product.belongsTo(models.User, {
      foreignKey: 'id'
    });

    //   // Product.hasMany(models.Cart, {
    //   //   foreignKey: 'cartId'
    //   // });
  };
  return Product;
};

export default product;