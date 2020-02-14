const cart = (sequelize, DataTypes) => {
  const Cart = sequelize.define('Cart', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false,
    },
    productId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: 'Products',
        key: 'id',
      },
      onDelete: 'CASCADE',
    },
    userId: {
      type: DataTypes.UUID,
      references: {
        model: 'Users',
        key: 'id',
      },
      onDelete: 'CASCADE',
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW(),
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: true,
    },
  }, {});
  Cart.associate = (models) => {
    // associations can be defined here
    Cart.belongsTo(models.Product, {
      foreignKey: 'id'
    });
    Cart.belongsTo(models.User, {
      foreignKey: 'id'
    });
  };
  return Cart;
};

export default cart;