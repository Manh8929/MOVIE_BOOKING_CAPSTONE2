module.exports = (sequelize, DataTypes) => {
  const News = sequelize.define("News", {
    news_id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
    movie_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    published_at: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  });

  News.associate = (models) => {
    News.belongsTo(models.Movie, { foreignKey: "movie_id" });
  };

  return News;
};
