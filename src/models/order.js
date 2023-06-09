const sequelize = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  const Order = sequelize.define(
    "Order",
    {
      totalPrice: {
        type: DataTypes.DECIMAL(6, 2),
        allowNull: false,
      },
      totalDiscount: {
        type: DataTypes.DECIMAL(6, 2),
      },
      deliveryFee: {
        type: DataTypes.DECIMAL(6, 2),
      },
      paymentSlip: DataTypes.STRING,
      orderStatus: {
        type: DataTypes.ENUM("confirmed", "pending"),
        allowNull: false,
        defaultValue: "pending",
      },
    },
    {
      paranoid: true,
      underscored: true,
    }
  );
  Order.associate = function (models) {
    // Order.hasOne(models.Payment, {
    //   foreignKey: {
    //     allowNull: false,
    //     name: "orderId",
    //   },
    //   onDelete: "RESTRICT",
    // });

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
