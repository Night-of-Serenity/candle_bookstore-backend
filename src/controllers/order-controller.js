const OrderService = require("../services/order-service");

exports.fetchOrdersListForAdmin = async (req, res, next) => {
  try {
    const ordersList = await OrderService.fetchAllOrders();
    res.status(200).json(ordersList);
  } catch (err) {
    next(err);
  }
};
