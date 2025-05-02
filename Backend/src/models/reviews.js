module.exports = (sequelize, DataTypes) => {
  const Review = sequelize.define("Review", {
    review_id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
    movie_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    rating: {
      type: DataTypes.INTEGER,
      allowNull: true,
      validate: {
        min: 1,
        max: 5,
      },
    },
    comment: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    sentiment: {
      type: DataTypes.ENUM("positive", "neutral", "negative"),
      allowNull: false,
    },
    review_time: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  });

  Review.associate = (models) => {
    Review.belongsTo(models.Movie, { foreignKey: "movie_id" });
    Review.belongsTo(models.User, { foreignKey: "user_id" });
  };

  return Review;
};
