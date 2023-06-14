const express = require("express");
const AuthenticateUser = require("../middlewares/authenticateUser");
const AuthenticateAdmin = require("../middlewares/authenticateAdmin");
const BookController = require("../controllers/book-controller");
const authenticateUser = require("../middlewares/authenticateUser");

const booksRoute = express.Router();

booksRoute.get("/getall", BookController.fetchAll);
booksRoute.get("/getbook/:bookId", BookController.getBookById);
booksRoute.post(
  "/addbook",
  AuthenticateUser,
  AuthenticateAdmin,
  BookController.addBook
);
booksRoute.put(
  "/editbook/:bookId",
  AuthenticateUser,
  AuthenticateAdmin,
  BookController.editBookById
);

booksRoute.delete(
  "/deletebook/:bookId",
  AuthenticateUser,
  AuthenticateAdmin,
  BookController.deleteBookById
);

booksRoute.get("/bestseller", BookController.getBestseller);

module.exports = booksRoute;
