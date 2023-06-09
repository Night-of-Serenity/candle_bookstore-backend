const { CartItem, Book, User, Order, OrderItem } = require("../models");
const createError = require("../utils/create-error");
const { Op } = require("sequelize");

exports.fetchCart = async (userId) => {
  try {
    const cart = await Book.findAll({
      include: [
        {
          model: CartItem,
          where: {
            userId: userId,
          },
        },
      ],
    });
    return cart;
  } catch (err) {
    createError("fetch cart error", 404);
  }
};

exports.addItemToCart = async (userId, bookId, quantity) => {
  try {
    // console.log(userId, bookId, quantity);
    const findExistItem = await CartItem.findOne({
      where: {
        [Op.and]: [{ userId: userId }, { bookId: bookId }],
      },
    });
    // console.log(findExistItem);

    if (findExistItem) {
      await CartItem.update(
        {
          quantity: +findExistItem.quantity + +quantity,
        },
        {
          where: { id: findExistItem.id },
        }
      );
    } else {
      await CartItem.create({
        userId: userId,
        bookId: bookId,
        quantity: quantity,
      });
    }

    const cart = await Book.findAll({
      include: [
        {
          model: CartItem,
          where: {
            userId: userId,
          },
        },
      ],
    });
    // console.log(cart);
    return cart;
  } catch (err) {
    createError("error from add cart item", 404);
  }
};

exports.reduceItemFromCart = async (userId, bookId, quantity) => {
  try {
    // console.log(userId, bookId, quantity);
    const findExistItem = await CartItem.findOne({
      where: {
        [Op.and]: [{ userId: userId }, { bookId: bookId }],
      },
    });

    // console.log(findExistItem);

    if (findExistItem) {
      if (findExistItem.quantity - quantity < 0) {
        createError("invalid remove item quantity", 404);
      }

      await CartItem.update(
        {
          quantity: +findExistItem.quantity - +quantity,
        },
        {
          where: { id: findExistItem.id },
        }
      );
    } else {
      createError("cannot find removed item on database", 404);
    }

    const cart = await Book.findAll({
      include: [
        {
          model: CartItem,
          where: {
            userId: userId,
          },
        },
      ],
    });
    // console.log(cart);
    return cart;
  } catch (err) {
    createError("error from add cart item", 404);
  }
};

exports.deleteItemFromCart = async (userId, bookId) => {
  try {
    const findExistItem = await CartItem.findOne({
      where: {
        [Op.and]: [{ userId: userId }, { bookId: bookId }],
      },
    });

    if (findExistItem) {
      CartItem.destroy({
        where: {
          [Op.and]: [{ userId: userId, bookId: bookId }],
        },
      });
    }

    const cart = await Book.findAll({
      include: [
        {
          model: CartItem,
          where: {
            userId: userId,
          },
        },
      ],
    });
    // console.log(cart);
    return cart;
  } catch (err) {
    createError("error from delete item from cart", 404);
  }
};

exports.updateUserDeliveryInfo = async (userId, input, transaction) => {
  try {
    const existUser = await User.findByPk(userId);

    if (!existUser) createError("unauthorize", 404);

    const result = await existUser.update(input, {
      transaction: transaction,
    });
    return result;
  } catch (err) {
    throw err;
  }
};

exports.countTotalPriceFromCart = (cart) => {
  const result = cart.reduce((sum, item) => {
    const price = item?.price;
    const quantity = item?.CartItems[0]?.quantity;
    const totalPrice = price * quantity;
    return sum + totalPrice;
  }, 0);
  return result;
};

exports.countTotalDiscountFromCart = (cart) => {
  return cart.reduce((sum, item) => {
    const price = item?.price;
    const discount = item?.discount;
    const quantity = item?.CartItems[0]?.quantity;
    return sum + price * discount * quantity;
  }, 0);
};

exports.createOrder = async (input, transaction) => {
  try {
    const order = await Order.create(input, { transaction: transaction });
    return order;
  } catch (err) {
    throw err;
  }
};

exports.createOrderItem = async (input, transaction) => {
  try {
    return OrderItem.create(input, { transaction });
  } catch (err) {
    throw err;
  }
};

exports.clearCart = async (userId, transaction) => {
  try {
    const result = await CartItem.destroy({
      where: { userId: userId },
      transaction,
    });
    if (result === 0) createError("error on clear cart", 400);
  } catch (err) {
    throw err;
  }
};
