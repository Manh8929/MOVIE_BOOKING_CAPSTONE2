module.exports = (sequelize, DataTypes) => {
  const Seat = sequelize.define("Seat", {
    seat_id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
    showtime_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    seat_number: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    screen_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    seat_type: {
      type: DataTypes.ENUM("regular", "vip", "disabled"),
      allowNull: false,
    },
    is_available: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
  });

  Seat.associate = (models) => {
    Seat.belongsTo(models.Showtime, { foreignKey: "showtime_id" });
    Seat.belongsTo(models.Screen, { foreignKey: "screen_id" });
  };

  return Seat;
};
