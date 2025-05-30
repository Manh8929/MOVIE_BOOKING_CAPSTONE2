module.exports = (sequelize, DataTypes) => {
  const News = sequelize.define(
    "News",
    {
      news_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
      },
      category: {
        type: DataTypes.ENUM('general', 'specific'),
        allowNull: false,
      },
      movie_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      title: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      content: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      published_at: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
      },
      image_url: {
        type: DataTypes.STRING,
        allowNull: true,
      },
    },
    {
      timestamps: true,
    }
  );
  News.associate = (models) => {
    News.belongsTo(models.Movie, { foreignKey: "movie_id" });
  };

  return News;
};
