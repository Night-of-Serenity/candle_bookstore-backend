const express = require("express");
const AuthenticateUser = require("../middlewares/authenticateUser");
const AuthenticateAdmin = require("../middlewares/authenticateAdmin");
const BookController = require("../controllers/book-controller");

const booksRoute = express.Router();

booksRoute.get("/getall", BookController.fetchAll);
booksRoute.get("/getbook/:bookId", BookController.getBookById);
booksRoute.post(
  "/addbook",
  AuthenticateUser,
  AuthenticateAdmin,
  BookController.addBook
);
booksRoute.post(
  "/editbook/:bookId",
  AuthenticateUser,
  AuthenticateAdmin,
  BookController.editBookById
);

module.exports = booksRoute;
