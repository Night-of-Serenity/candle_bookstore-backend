const sequelize = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  const BookToGenre = sequelize.define(
    "BookToGenre",
    {},
    { underscored: true }
  );

  BookToGenre.associate = function (models) {
    BookToGenre.belongsTo(models.Book, {
      foreignKey: {
        allowNull: false,
        name: "bookId",
      },
      onDelete: "RESTRICT",
    });
    BookToGenre.belongsTo(models.Genre, {
      foreignKey: {
        allowNull: false,
        name: "genreId",
      },
      onDelete: "RESTRICT",
    });
  };

  return BookToGenre;
};
