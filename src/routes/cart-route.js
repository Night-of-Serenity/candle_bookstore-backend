const express = require("express");
const AuthenticateUser = require("../middlewares/authenticateUser");
const AuthenticateAdmin = require("../middlewares/authenticateAdmin");
const CartController = require("../controllers/cart-controller");

const cartRoute = express.Router();

cartRoute.post("/additem", AuthenticateUser, CartController.addItemById);

module.exports = cartRoute;
