const express = require("express");
const AuthenticateUser = require("../middlewares/authenticateUser");
const CartController = require("../controllers/cart-controller");

const cartRoute = express.Router();

cartRoute.post("/additem", AuthenticateUser, CartController.addItemToCart);

cartRoute.get("/fetchcart", AuthenticateUser, CartController.fetchCart);

cartRoute.patch(
  "/removeitem",
  AuthenticateUser,
  CartController.removeItemFromCart
);

module.exports = cartRoute;
