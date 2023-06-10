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
    await Genre.bulkCreate(mockGenres);
    await Book.bulkCreate(mockBooks);
    // console.log(mockGenres);
    // await BookToGenre.bulkCreate(Book_to_Genre);

    // for (const data of Book_to_Genre) {
    //   // Find the book by title
    //   const book = await Book.findOne({ where: { id: data.book_id } });

    //   // Find the genre by name
    //   const genre = await Genre.findOne({ where: { id: data.genre_id } });

    //   // Create a record in the bookToGenre table
    //   await BookToGenre.create({ bookId: book.id, genreId: genre.id });
    // }

    process.exit(0);
  } catch (err) {
    console.log(err.message);
  }
};

createMockData();

// console.log(mockBooks);
// console.log(mockGenres);
// console.log(Book_to_Genre);
