const { Order, OrderItem } = require("../models");
const createError = require("../utils/create-error");

exports.fetchAllOrders = async () => {
  try {
    return Order.findAll({
      include: [OrderItem],
      order: [["createdAt", "DESC"]],
    });
  } catch (err) {
    throw err;
  }
};
