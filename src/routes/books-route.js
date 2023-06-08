const express = require("express");
const Authenticate = require("../middlewares/authenticateAdmin");
const AuthenticateUser = require("../middlewares/authenticateUser");
const AuthenticateAdmin = require("../middlewares/authenticateAdmin");

const booksRoute = express.Router();

booksRoute.post("/add", AuthenticateUser, AuthenticateAdmin, () => {});
