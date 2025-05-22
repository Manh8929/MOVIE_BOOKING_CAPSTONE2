module.exports = (sequelize, DataTypes) => {
  const Seat = sequelize.define(
    "Seat",
    {
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
      seat_type_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "seat_types",
          key: "seat_type_id",
        },
      },
      is_available: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
      },
    },
    {
      timestamps: true,
    }
  );

  Seat.associate = (models) => {
    Seat.belongsTo(models.Showtime, { foreignKey: "showtime_id" });
    Seat.belongsTo(models.Screen, { foreignKey: "screen_id" });
    Seat.belongsTo(models.SeatType, { foreignKey: "seat_type_id" ,as: 'type',});
    Seat.hasMany(models.BookingSeat, { foreignKey: "seat_id" });
  };

  return Seat;
};
