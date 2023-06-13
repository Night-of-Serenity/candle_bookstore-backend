const { Book, BookToGenre, Genre } = require("../models");
const { sequelize } = require("../models");
const createError = require("../utils/create-error");

exports.addBook = async (input) => {
  try {
    const { genres, ...book } = input;
    console.log("genres", genres);
    console.log("book", book);

    const bookRes = await Book.create(book);

    // console.log(bookRes);

    const result = genres.map((genreId) => {
      const bookToGenre = { bookId: bookRes.id, genreId: genreId };
      return BookToGenre.create(bookToGenre);
    });
    console.log(bookRes.id);

    await Promise.all(result);

    const newBook = await Book.findOne({
      where: { id: bookRes.id },
      include: [
        {
          model: BookToGenre,
          include: Genre,
        },
      ],
    });

    console.log("new book", newBook);
    return newBook;
  } catch (err) {
    throw err;
  }
};

exports.getAll = async () => {
  try {
    const allBooks = await Book.findAll({
      include: [
        {
          model: BookToGenre,
        },
      ],
    });
    console.log(allBooks);
    return allBooks;
  } catch (err) {
    throw err;
  }
};

exports.getBookById = async (bookId) => {
  try {
    const book = await Book.findOne({
      where: {
        id: bookId,
      },
      include: [
        {
          model: BookToGenre,
          include: Genre,
        },
      ],
    });
    console.log(book);
    return book;
  } catch (err) {
    throw err;
  }
};

exports.editBookById = async (bookId, input) => {
  try {
    console.log("edit book input", input);
    // modified input
    const genres = input.genres;
    delete input.id;
    delete input.BookToGenres;
    delete input.genres;
    delete input.createdAt;
    delete input.updatedAt;
    delete input.deletedAt;
    console.log("genres", genres);
    console.log("input after modified", input);

    const t = await sequelize.transaction();
    try {
      await Book.update(input, {
        where: { id: bookId },
        transaction: t,
      });

      // delete old genres records of this book
      await BookToGenre.destroy({
        where: {
          bookId: bookId,
        },
        transaction: t,
      });

      // create new genres records of this book
      const result = genres.map((genreId) => {
        const bookToGenre = { bookId: bookId, genreId: genreId };
        return BookToGenre.create(bookToGenre, { transaction: t });
      });

      await Promise.all(result);
      await t.commit();
    } catch (err) {
      await t.rollback();
    }
    const newBook = await Book.findOne({
      where: { id: bookId },
      include: [
        {
          model: BookToGenre,
          include: Genre,
        },
      ],
    });

    console.log("new book", newBook);
    return newBook;
  } catch (err) {
    throw err;
  }
};

exports.deleteBookById = async (bookId) => {
  try {
    await Book.destroy({
      where: { id: bookId },
    });
  } catch (err) {
    throw err;
  }
};
