const CartService = require("../services/cart-service");

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
