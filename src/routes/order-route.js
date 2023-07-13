const express = require("express");
const AuthenticateUser = require("../middlewares/authenticateUser");
const AuthenticateAdmin = require("../middlewares/authenticateAdmin");
const OrderController = require("../controllers/order-controller");
const authenticateUser = require("../middlewares/authenticateUser");

const orderRoute = express.Router();

orderRoute.get(
  "/fetchadminorderslist",
  AuthenticateUser,
  AuthenticateAdmin,
  OrderController.fetchOrdersListForAdmin
);

orderRoute.patch(
  "/toggleOrderStatus/:orderId",
  authenticateUser,
  AuthenticateAdmin,
  OrderController.toggleOrderStatus
);

module.exports = orderRoute;
