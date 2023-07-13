const { CartItem, Book, User } = require("../models");
const { sequelize } = require("../models");
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
