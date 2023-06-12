const express = require("express");
const AuthenticateUser = require("../middlewares/authenticateUser");
const AuthenticateAdmin = require("../middlewares/authenticateAdmin");
const BookController = require("../controllers/book-controller");

const booksRoute = express.Router();

booksRoute.post(
  "/addbook",
  AuthenticateUser,
  AuthenticateAdmin,
  BookController.addBook
);

module.exports = booksRoute;
