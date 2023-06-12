const { Book, BookToGenre } = require("../models/");

exports.addBook = async (input) => {
  try {
    // console.log(input);
    // input.BookToGenre = input.genres;
    // delete input.genres;

    console.log(input);
    // const bookRes = await Book.create(input, {
    //       include: [
    //             {
    //                   association: Book.BookToGenre,
    //                 },
    //               ],
    //             });
    const { genres, ...book } = input;
    console.log("genres", genres);
    console.log("book", book);
    const bookRes = await Book.create(book);

    // console.log(bookRes);

    genres.forEach((genreId) => {
      const bookToGenre = { bookId: bookRes.id, genreId: genreId };
      const createBookToGenre = async (genreId) => {
        const bookToGenreRes = await BookToGenre.create(bookToGenre);
        // console.log(bookToGenreRes);
      };
      createBookToGenre();
    });

    const newBook = await Book.findOne({
      where: { id: bookRes.id },
      include: BookToGenre,
    });
    console.log(newBook);
    return newBook;
  } catch (err) {
    throw err;
  }
  //   const book = await Book.create(input);
  //   console.log(book);
};
