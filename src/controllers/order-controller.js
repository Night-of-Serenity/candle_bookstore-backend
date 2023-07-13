const OrderService = require("../services/order-service");

exports.fetchOrdersListForAdmin = async (req, res, next) => {
  try {
    const ordersList = await OrderService.fetchAllOrders();
    res.status(200).json(ordersList);
  } catch (err) {
    next(err);
  }
};

exports.toggleOrderStatus = async (req, res, next) => {
  try {
    const { orderId } = req.params;
    const updatedOrder = await OrderService.toggleOrderStatus(orderId);
    res.status(200).json(updatedOrder);
  } catch (err) {
    next(err);
  }
};
