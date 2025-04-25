module.exports = (sequelize, DataTypes) => {
  const Movie = sequelize.define("Movie", {
    movie_id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    genre: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    duration: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    release_date: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    status: {
      type: DataTypes.ENUM("upcoming", "now_showing", "ended"),
      allowNull: false,
    },
    poster_url: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    trailer_url: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    banner_url: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    avatar_url: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    detailed_description: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    rating: {
      type: DataTypes.DECIMAL(3, 2),
      allowNull: false,
      validate: {
        min: 0,
        max: 10,
      },
    },
    director: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    actors: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    language: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    created_at: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
    updated_at: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  },{
    tableName: "Movies",
    timestamps: false,
  });

  return Movie;
};
