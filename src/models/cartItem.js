module.exports = (sequelize, DataTypes) => {
  const CartItem = sequelize.define(
    "CartItem",
    {
      quantity: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      price: {
        type: DataTypes.DECIMAL,
        allowNull: false,
      },
      discount: {
        type: DataTypes.DECIMAL,
      },
    },
    {
      underscored: true,
    }
  );

  CartItem.associate = function (models) {
    CartItem.belongsTo(models.User, {
      foreignKey: {
        allowNull: false,
        name: "userId",
      },
      onDelete: "RESTRICT",
    });

    CartItem.belongsTo(models.Book, {
      foreignKey: {
        allowNull: false,
        name: "bookId",
      },
      onDelete: "RESTRICT",
    });
  };

  return CartItem;
};
