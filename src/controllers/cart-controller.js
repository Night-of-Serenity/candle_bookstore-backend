const CartService = require("../services/cart-service");
const { sequelize } = require("../models");
const createError = require("../utils/create-error");
const UploadService = require("../services/upload-service");
const fs = require("fs");

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
    } else {
      createError("incomplete delivery infomation", 400);
    }

    // paymentSlip image input
    let paymentSlip;
    if (req.file) {
      console.log(req.file);
      // upload to cloudinary
      const result = await UploadService.upload(req.file.path);

      // get secure url return from cloudinary's result
      paymentSlip = result.secure_url;
    }

    if (cart && cart.length)
      await CartService.submitOrder(userId, paymentSlip, cart, t);

    res.status(200).json({ message: "success" });
  } catch (err) {
    await t.rollback();
    next(err);
  } finally {
    if (req.file) {
      fs.unlinkSync(req.file.path);
    }
  }
};
