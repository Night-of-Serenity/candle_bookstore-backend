const BookService = require("../services/book-service");
const UploadService = require("../services/upload-service");
const fs = require("fs");

module.exports.addBook = async (req, res, next) => {
  try {
    // console.log(req.body);
    const result = await BookService.addBook(req.body);
    res.status(200).json(result);
  } catch (err) {
    next(err);
  }
};

module.exports.fetchAll = async (req, res, next) => {
  try {
    const allBooks = await BookService.getAll();
    res.status(200).json(allBooks);
  } catch (err) {
    next(err);
  }
};

module.exports.getBookById = async (req, res, next) => {
  try {
    const { bookId } = req.params;
    // console.log(bookId);
    const book = await BookService.getBookById(bookId);
    res.status(200).json(book);
  } catch (err) {
    next(err);
  }
};

module.exports.editBookById = async (req, res, next) => {
  try {
    const { bookId } = req.params;
    console.log("edit data----", req.body);
    const data = { ...req.body };
    for (let key in data) {
      data[key] = JSON.parse(data[key]);
    }
    console.log("edit data pare", data);
    let bookCover;
    if (req.file) {
      // console.log(req.file);
      // upload to cloudinary
      const result = await UploadService.upload(req.file.path);

      // get secure url return from cloudinary's result
      bookCover = result.secure_url;
    }
    console.log("book cover", bookCover);
    const newData = { ...data, bookCover: bookCover };
    const book = await BookService.editBookById(bookId, newData);
    res.status(200).json(book);
  } catch (err) {
    next(err);
  } finally {
    if (req.file) {
      fs.unlinkSync(req.file.path);
    }
  }
};

module.exports.deleteBookById = async (req, res, next) => {
  try {
    const { bookId } = req.params;
    await BookService.deleteBookById(bookId);
    res.status(200).json({ message: "delete book succeed" });
  } catch (err) {
    next(err);
  }
};

module.exports.getBestseller = async (req, res, next) => {
  try {
    const books = await BookService.getTopSeller(30);
    // console.log(books);
    res.status(200).json(books);
  } catch (err) {
    next(err);
  }
};

module.exports.getDiscountBooks = async (req, res, next) => {
  try {
    const books = await BookService.getDiscountBooks();
    // console.log("discount books from controller", books);
    res.status(200).json(books);
  } catch (err) {
    next(err);
  }
};

module.exports.fetchGenres = async (req, res, next) => {
  try {
    const genres = await BookService.getGenres();
    res.status(200).json(genres);
  } catch (err) {
    next(err);
  }
};

module.exports.fetchBooksByGenreId = async (req, res, next) => {
  try {
    // console.log(req.body.genreId);
    const books = await BookService.getBookByGenreId(req.params.genreId);
    res.status(200).json(books);
  } catch (err) {
    next(err);
  }
};

module.exports.fetchBooksBySearchQuery = async (req, res, next) => {
  try {
    const { title } = req.query;
    console.log("title-----", title);
    const books = await BookService.searchBookByTitle(title);
    res.status(200).json(books);
  } catch (err) {
    next(err);
  }
};

module.exports.fetchBooksStock = async (req, res, next) => {
  try {
    const booksStock = await BookService.getBooksStock();
    res.status(200).json(booksStock);
  } catch (err) {
    next(err);
  }
};
