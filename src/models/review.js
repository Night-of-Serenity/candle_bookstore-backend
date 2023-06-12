module.exports = (sequelize, DataTypes) => {
  const Review = sequelize.define(
    "Review",
    {
      rating: {
        type: DataTypes.INTEGER,
        allowNull: false,
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

    // Review.belongsToMany(models.User, { through: models.Like });

    // Review.addConstraint("ReviewUserBook", ["usersId", "bookId"], {
    //   type: "unique",
    //   // "primary key",
    //   name: "ReviewUserBook_pkey",
    // });
  };

  return Review;
};
