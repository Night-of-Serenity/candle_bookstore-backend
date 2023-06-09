module.exports = (sequelize, DataTypes) => {
  const Review = sequelize.define(
    "Review",
    {
      rating: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      reviewText: {
        type: DataTypes.TEXT,
      },
    },
    {
      underscored: true,
    }
  );

  Review.associate = function (models) {
    Review.belongsTo(models.User, {
      foreignKey: {
        allowNull: false,
        name: "userId",
      },
      onDelete: "RESTRICT",
    });

    Review.belongsTo(models.Book, {
      foreignKey: {
        allowNull: false,
        name: "bookId",
      },
      onDelete: "RESTRICT",
    });

    // Review.hasMany(models.Like, {
    //   foreignKey: {
    //     allowNull: false,
    //     name: "reviewId",
    //   },
    //   onDelete: "RESTRICT",
    // });

    Review.belongsToMany(models.User, { through: models.Like });

    // Review.addConstraint("ReviewUserBook", ["usersId", "bookId"], {
    //   type: "unique",
    //   // "primary key",
    //   name: "ReviewUserBook_pkey",
    // });
  };

  return Review;
};
