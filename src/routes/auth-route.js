const express = require("express");
const AuthController = require("../controllers/auth-controller");
const AuthenticateUser = require("../middlewares/authenticateUser");

const authRoute = express.Router();

authRoute.post("/register", AuthController.register);
authRoute.post("/login", AuthController.login);
authRoute.get("/fetchme", AuthenticateUser, AuthController.fetchMe);

module.exports = authRoute;
