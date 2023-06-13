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
