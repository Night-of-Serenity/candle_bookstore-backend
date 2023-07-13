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
