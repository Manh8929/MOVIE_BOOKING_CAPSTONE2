module.exports = (sequelize, DataTypes) => {
  const Showtime = sequelize.define(
    "Showtime",
    {
      showtime_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
      },
      movie_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      screen_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      status: {
        type: DataTypes.ENUM("scheduled", "completed", "canceled"),
        defaultValue: "scheduled",
      },
      show_time: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      ticket_price: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
      },
    },
    {
      timestamps: true,
      tableName: "showtimes",
    }
  );

  Showtime.associate = (models) => {
    Showtime.belongsTo(models.Movie, { foreignKey: "movie_id" });
    Showtime.belongsTo(models.Screen, { foreignKey: "screen_id" });
  };

  return Showtime;
};
