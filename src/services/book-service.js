const { Book, BookToGenre, Genre } = require("../models");

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
  //   const book = await Book.create(input);
  //   console.log(book);
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
