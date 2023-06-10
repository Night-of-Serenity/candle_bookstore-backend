const { sequelize, User, Book, Genre, BookToGenre } = require("../models");
const bcrypt = require("bcryptjs");
const mockUsers = require("./mock_users.json");
const mockBooks = require("./mock_books.json");
const mockGenres = require("./genres.json");
const Book_to_Genre = require("./BookToGenre.json");

const createMockData = async () => {
  try {
    await sequelize.sync({ force: true });
    const users = mockUsers.map((user) => ({
      ...user,
      ...{ password: bcrypt.hashSync("123456") },
    }));

    // console.log(users);
    await User.bulkCreate(users);
    // await Book.bulkCreate(mockBooks);
    await Genre.bulkCreate(mockGenres);
    // await BookToGenre.bulkCreate(Book_to_Genre);
    process.exit(0);
  } catch (err) {
    console.log(err.message);
  }
};

// createMockData();

// console.log(mockBooks);
// console.log(mockGenres);
// console.log(Book_to_Genre);
