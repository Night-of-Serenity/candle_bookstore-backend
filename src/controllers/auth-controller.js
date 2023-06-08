const AuthValidators = require("../validators/auth-validator");
const UserService = require("../services/user-service");
const createError = require("../utils/create-error");
const bcrypService = require("../services/bcrypt-service");
const tokenService = require("../services/token-service");
exports.register = async (req, res, next) => {
  try {
    // validate register inputs
    const result = AuthValidators.validateRegister(req.body);

    // check username or email exist in database
    const isUserExist = await UserService.checkUsernameOrEmailExist(result);

    if (isUserExist) {
      createError("Username or email already exist", 400);
    }

    // hash password
    result.password = await bcrypService.hash(result.password);

    const user = await UserService.createUser(result);
    console.log(result);
    console.log(user);
    res.status(200).json(user);
  } catch (err) {
    next(err);
  }
};

exports.login = async (req, res, next) => {
  try {
    //validate login input
    const result = AuthValidators.validateLogin(req.body);

    // get user by username from database
    const user = await UserService.getUserByUsername(result.username);

    if (!user) {
      createError("invalid credential", 400);
    }

    // validate password
    const isValidPassword = await bcrypService.compare(
      req.body.password,
      user.password
    );

    if (!isValidPassword) {
      createError("invalid credential", 400);
    }

    const accessToken = tokenService.sign({ id: user.id });

    res.status(200).json({ accessToken, isAdmin: user.isAdmin });
  } catch (err) {
    next(err);
  }
};

exports.fetchMe = async (req, res, next) => {
  try {
    if (req.user) {
      res.status(200).json(req.user);
    } else {
      throw new Error("no user data attratched on request");
    }
  } catch (err) {
    next(err);
  }
};
