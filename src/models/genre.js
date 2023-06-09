const { allow } = require("joi");
const sequelize = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  const Genre = sequelize.define(
    "Genre",
    {
      genre: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      underscored: true,
    }
  );

  Genre.associate = function (models) {
    // Genre.hasMany(models.BookToGenre, {
    //   foreignKey: {
    //     allowNull: false,
    //     name: "genreId",
    //   },
    //   onDelete: "RESTRICT",
    // });

    Genre.belongsToMany(models.Book, { through: models.BookToGenre });
  };

  return Genre;
};
