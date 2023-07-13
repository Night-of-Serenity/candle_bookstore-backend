module.exports = (sequelize, DataTypes) => {
  const Payment = sequelize.define(
    "Payment",
    {
      paymentDate: {
        type: DataTypes.DATEONLY,
      },
      paymentTime: {
        type: DataTypes.TIME,
      },
      paymentMethod: {
        type: DataTypes.ENUM("bank transfer", "QRpromptpay"),
      },
      paymentSlip: {
        type: DataTypes.STRING,
      },
      transactionId: {
        type: DataTypes.INTEGER,
      },
    },
    {
      paranoid: true,
      underscored: true,
    }
  );
  Payment.associate = function (models) {
    Payment.belongsTo(models.Order, {
      foreignKey: {
        allowNull: false,
        name: "orderId",
      },
      onDelete: "RESTRICT",
    });
  };
  return Payment;
};
