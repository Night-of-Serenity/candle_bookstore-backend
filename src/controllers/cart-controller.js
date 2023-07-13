const CartService = require("../services/cart-service");
const { sequelize } = require("../models");

module.exports.addItemToCart = async (req, res, next) => {
  try {
    const { bookId, quantity } = req.body;
    const cart = await CartService.addItemToCart(req.user.id, bookId, quantity);
    res.status(200).json(cart);
  } catch (err) {
    next(err);
  }
};

module.exports.fetchCart = async (req, res, next) => {
  try {
    const cart = await CartService.fetchCart(req.user.id);
    res.status(200).json(cart);
  } catch (err) {
    next(err);
  }
};

module.exports.reduceItemFromCart = async (req, res, next) => {
  try {
    const { bookId, quantity } = req.body;
    const cart = await CartService.reduceItemFromCart(
      req.user.id,
      bookId,
      quantity
    );
    res.status(200).json(cart);
  } catch (err) {
    next(err);
  }
};

module.exports.deleteItemFromCart = async (req, res, next) => {
  try {
    const cart = await CartService.deleteItemFromCart(
      req.user.id,
      req.params.bookId
    );
    res.status(200).json(cart);
  } catch (err) {
    next(err);
  }
};

module.exports.submitOrder = async (req, res, next) => {
  const t = await sequelize.transaction();
  try {
    const userId = req.user.id;
    console.log("submit order input:", req.body);
    const { firstName, lastName, mobile, address } = req.body;
    const cart = JSON.parse(req.body.cartItems);
    console.log("cart--------", cart);
    const paymentSlip = req.file;
    console.log("slip ------", paymentSlip);

    if (
      firstName &&
      firstName.trim() &&
      lastName &&
      lastName.trim() &&
      mobile &&
      mobile.trim() &&
      address &&
      address.trim()
    ) {
      await CartService.updateUserDeliveryInfo(
        userId,
        {
          firstName,
          lastName,
          mobile,
          address,
        },
        t
      );
    }

    res.status(200).json({ ...input, paymentSlip });
  } catch (err) {
    next(err);
  }
};
