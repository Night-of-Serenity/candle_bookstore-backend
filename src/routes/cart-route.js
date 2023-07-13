const express = require("express");
const AuthenticateUser = require("../middlewares/authenticateUser");
const upload = require("../middlewares/uploadMiddleware");
const CartController = require("../controllers/cart-controller");

const cartRoute = express.Router();

cartRoute.post("/additem", AuthenticateUser, CartController.addItemToCart);

cartRoute.get("/fetchcart", AuthenticateUser, CartController.fetchCart);

cartRoute.patch(
  "/reduceitem",
  AuthenticateUser,
  CartController.reduceItemFromCart
);

cartRoute.delete(
  "/deleteitem/:bookId",
  AuthenticateUser,
  CartController.deleteItemFromCart
);

cartRoute.post(
  "/submitpayment",
  AuthenticateUser,
  upload.single("paymentSlip"),
  CartController.submitOrder
);

module.exports = cartRoute;
