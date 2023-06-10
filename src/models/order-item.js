const sequelize = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  const OrderItem = sequelize.define(
    "OrderItem",
    {
      quantity: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      price: {
        type: DataTypes.DECIMAL(6, 2),
        allowNull: false,
      },
      discount: {
        type: DataTypes.DECIMAL(6, 2),
      },
    },
    {
      paranoid: true,
      underscored: true,
    }
  );
  OrderItem.associate = function (models) {
    OrderItem.belongsTo(models.Order, {
      foreignKey: {
        allowNull: false,
        name: "orderId",
      },
      onDelete: "RESTRICT",
    });
    OrderItem.belongsTo(models.Book, {
      foreignKey: {
        allowNull: false,
        name: "bookId",
      },
      onDelete: "RESTRICT",
    });
  };
  return OrderItem;
};
