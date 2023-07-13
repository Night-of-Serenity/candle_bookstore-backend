const { or } = require("sequelize");
const { Order, OrderItem, User } = require("../models");
const createError = require("../utils/create-error");

exports.fetchAllOrders = async () => {
  try {
    return Order.findAll({
      include: [User, OrderItem],
      order: [["createdAt", "DESC"]],
    });
  } catch (err) {
    throw err;
  }
};

exports.toggleOrderStatus = async (orderId) => {
  try {
    const order = await Order.findByPk(orderId);
    if (!order) createError("no reference order", 400);
    const newOrderStatus =
      order.orderStatus == "pending" ? "confirmed" : "pending";
    return order.update({ orderStatus: newOrderStatus });
  } catch (err) {
    throw err;
  }
};
