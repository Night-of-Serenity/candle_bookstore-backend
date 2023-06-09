const sequelize = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  const Order = sequelize.define(
    "Order",
    {
      totalPrice: {
        type: DataTypes.DECIMAL,
        allowNull: false,
      },
      totalDiscount: {
        type: DataTypes.DECIMAL,
      },
      deliveryFee: {
        type: DataTypes.DECIMAL,
      },
      OrderStatus: {
        type: DataTypes.ENUM("confirmed", "pending"),
        allowNull: false,
      },
    },
    {
      paranoid: true,
      underscored: true,
    }
  );
  Order.associate = function (models) {
    Order.belongsTo(models.Payment, {
      foreignKey: {
        allowNull: false,
        name: "paymentId",
      },
      onDelete: "RESTRICT",
    });

    Order.hasMany(models.OrderItem, {
      foreignKey: {
        allowNull: false,
        name: "orderId",
      },
      onDelete: "RESTRICT",
    });

    Order.belongsTo(models.User, {
      foreignKey: {
        allowNull: false,
        name: "userId",
      },
      onDelete: "RESTRICT",
    });
  };
  return Order;
};
