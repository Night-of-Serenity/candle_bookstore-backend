const CartService = require("../services/cart-service");
const { sequelize, Book } = require("../models");
const createError = require("../utils/create-error");
const UploadService = require("../services/upload-service");
const BookService = require("../services/book-service");
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
    // console.log("submit order input:", req.body);
    const { firstName, lastName, mobile, address } = req.body;
    const cart = JSON.parse(req.body.cartItems);
    // console.log("cart--------", cart);
    const { deliveryFee } = req.body;

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
      // console.log(req.file);
      // upload to cloudinary
      const result = await UploadService.upload(req.file.path);

      // get secure url return from cloudinary's result
      paymentSlip = result.secure_url;
    }

    // console.log("paymentSlip-----", paymentSlip);

    if (cart && cart.length) {
      const totalPrice = CartService.countTotalPriceFromCart(cart);
      const totalDiscount = CartService.countTotalDiscountFromCart(cart);
      // console.log("totalPrice----", totalPrice);
      // console.log("totalDiscount-----", totalDiscount);

      const orderInput = {
        userId,
        totalPrice,
        totalDiscount,
        paymentSlip,
        deliveryFee,
      };

      // createOrder
      const newOrder = await CartService.createOrder(orderInput, t);

      // createOrderItems
      const newOrderItems = cart.map(async (item) => {
        const book = await Book.findByPk(item.id, { transaction: t });
        if (!book) createError(`no reference book id:${item.id}`, 400);

        price = item.price;
        discount = item.discount;
        quantity = item.CartItems[0]?.quantity;
        const orderItemInput = {
          bookId: book.id,
          orderId: newOrder.id,
          price: price,
          discount: discount,
          quantity: quantity,
        };
        return CartService.createOrderItem(orderItemInput, t);
      });
      await Promise.all(newOrderItems);

      // reduce book stock
      const updatedBooks = cart.map((book) => {
        quantity = book?.CartItems[0].quantity;
        return BookService.reduceBookStock(book.id, quantity, t);
      });
      await Promise.all(updatedBooks);

      // clear cart
      await CartService.clearCart(userId, t);
    }

    await t.commit();
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
