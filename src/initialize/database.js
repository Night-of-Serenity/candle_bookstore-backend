const { sequelize, User } = require("../models");
const bcrypt = require("bcryptjs");
const mockUsers = require("./mock_users.json");

const createMockData = async () => {
  try {
    await sequelize.sync({ force: true });
    // const password = bcrypt.hashSync("123456");
    const users = mockUsers.map((user) => ({
      ...user,
      ...{ password: bcrypt.hashSync("123456") },
    }));
    console.log(users);
    await User.bulkCreate(users);
    process.exit(0);
  } catch (err) {
    console.log(err.message);
  }
};

createMockData();

// sequelize
//   .sync({ force: true })
//   .then(() => {
//     return User.bulkCreate([
//       { name: "Andy", password: hashed },
//       { name: "Bobby", password: hashed },
//       { name: "Candy", password: hashed },
//       { name: "Danny", password: hashed },
//       { name: "Eddy", password: hashed },
//     ]);
//   })
//   .then(() => process.exit(0))
//   .catch((err) => console.log(err.message));

// sequelize.sync({ force: true });
