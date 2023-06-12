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
