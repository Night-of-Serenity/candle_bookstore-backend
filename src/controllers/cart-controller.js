const CartService = require("../services/cart-service");

module.exports.addItemById = async (req, res, next) => {
  try {
    const { bookId, quantity } = req.body;
    const cart = await CartService.addItemById(req.user.id, bookId, quantity);
    res.status(200).json(cart);
  } catch (err) {
    next(err);
  }
};
