const { CartItem, Book, User } = require("../models");
const { sequelize } = require("../models");
const createError = require("../utils/create-error");
const { Op } = require("sequelize");

exports.addItemById = async (userId, bookId, quantity) => {
  try {
    console.log(userId, bookId, quantity);
    const findExistItem = await CartItem.findOne({
      where: {
        [Op.and]: [{ userId: userId }, { bookId: bookId }],
      },
    });
    console.log(findExistItem);

    if (findExistItem) {
      await CartItem.update(
        {
          userId: userId,
          bookId: bookId,
          quantity: findExistItem.quantity + quantity,
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
    console.log(cart);
    return cart;
  } catch (err) {
    createError("error from add cart item", 404);
  }
};
