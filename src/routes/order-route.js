const express = require("express");
const AuthenticateUser = require("../middlewares/authenticateUser");
const AuthenticateAdmin = require("../middlewares/authenticateAdmin");
const OrderController = require("../controllers/order-controller");

const orderRoute = express.Router();

orderRoute.post("/fetchadminorderslist", AuthenticateUser, AuthenticateAdmin);

module.exports = orderRoute;
