const { User } = require("../models");
const { Op } = require("sequelize");

exports.checkUsernameOrEmailExist = async (input) => {
  // check user exist in database
  const { username, email } = input;
  const user = await User.findOne({
    where: {
      [Op.or]: [{ username: username }, { email: email }],
    },
  });

  if (user) {
    return true;
  } else {
    return false;
  }
};

exports.createUser = (user) => User.create(user);

exports.getUserByUsername = async (username) => {
  const user = await User.findOne({
    where: { username: username },
  });
  return user;
};
