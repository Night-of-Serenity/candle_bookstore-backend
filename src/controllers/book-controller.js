const BookService = require("../services/book-service");

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
    console.log(bookId);
    const book = await BookService.getBookById(bookId);
    res.status(200).json(book);
  } catch (err) {
    next(err);
  }
};

module.exports.editBookById = async (req, res, next) => {
  try {
    const { bookId } = req.params;
    const book = await BookService.editBookById(bookId, req.body);
    res.status(200).json(book);
  } catch (err) {
    next(err);
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
    console.log("discount books from controller", books);
    res.status(200).json(books);
  } catch (err) {
    next(err);
  }
};
