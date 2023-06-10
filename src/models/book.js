const sequelize = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  const Book = sequelize.define(
    "Book",
    {
      title: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: true,
        },
      },
      author: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: true,
        },
      },
      pages: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      publishedYear: {
        type: DataTypes.INTEGER,
      },
      quantity: {
        type: DataTypes.INTEGER,
      },
      saleQuantity: {
        type: DataTypes.INTEGER,
      },
      price: {
        type: DataTypes.DECIMAL(6, 2),
        allowNull: false,
      },
      discount: {
        type: DataTypes.DECIMAL(6, 2),
      },
      description: {
        type: DataTypes.TEXT,
      },
      reviewCount: {
        type: DataTypes.INTEGER,
      },
      rating: {
        type: DataTypes.DECIMAL(6, 2),
      },
    },
    {
      paranoid: true,
      underscored: true,
    }
  );

  Book.associate = function (models) {
    Book.hasMany(models.CartItem, {
      foreignKey: {
        allowNull: false,
        name: "bookId",
      },
      onDelete: "RESTRICT",
    });

    Book.hasMany(models.OrderItem, {
      foreignKey: {
        allowNull: false,
        name: "bookId",
      },
      onDelete: "RESTRICT",
    });

    Book.hasMany(models.Review, {
      foreignKey: {
        allowNull: false,
        name: "bookId",
      },
      onDelete: "RESTRICT",
    });

    // Book.hasMany(models.BookToGenre, {
    //   foreignKey: {
    //     allowNull: false,
    //     name: "bookId",
    //   },
    //   onDelete: "RESTRICT",
    // });

    Book.belongsToMany(models.Genre, { through: models.BookToGenre });
  };
  return Book;
};
