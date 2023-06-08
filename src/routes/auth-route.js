const express = require("express");
const AuthController = require("../controllers/auth-controller");

const authRoute = express.Router();

authRoute.post("/register", AuthController.register);
authRoute.post("/login", AuthController.login);

module.exports = authRoute;
