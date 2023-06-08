const tokenService = require("../services/token-service");
const userService = require("../services/user-service");

const authenticateUser = async (req, res, next) => {
  try {
    const { authorization } = req.headers;
    // Check token exist on authorization header
    if (!authorization || !authorization.startsWith("Bearer ")) {
      createError("unauthorized", 401);
    }
    const accessToken = authorization.split(" ")[1];
    if (!accessToken) {
      createError("unauthorized", 401);
    }

    // verify token and get payload
    const payload = await tokenService.verify(accessToken);
    const user = await userService.getUserById(payload.id);
    if (!user) {
      createError("unauthorized", 401);
    }

    console.log("hello from authen user");
    req.user = user;
    next();
  } catch (err) {
    next(err);
  }
};

module.exports = authenticateUser;
