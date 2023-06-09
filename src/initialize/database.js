const { sequelize, User } = require("../models");
const bcrypt = require("bcryptjs");
const mockUsers = require("./mock_users.json");

const createMockData = async () => {
  try {
    await sequelize.sync({ force: true });
    const users = mockUsers.map((user) => ({
      ...user,
      ...{ password: bcrypt.hashSync("123456") },
    }));
    // console.log(users);
    await User.bulkCreate(users);
    process.exit(0);
  } catch (err) {
    console.log(err.message);
  }
};

createMockData();
