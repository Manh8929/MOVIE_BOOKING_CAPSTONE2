module.exports = (sequelize, DataTypes) => {
  const BookingSeat = sequelize.define(
    "BookingSeat",
    {
      booking_seat_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
      },
      booking_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      seat_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      timestamps: true,
    }
  );

  BookingSeat.associate = (models) => {
    BookingSeat.belongsTo(models.Booking, { foreignKey: "booking_id" });
    BookingSeat.belongsTo(models.Seat, { foreignKey: "seat_id" });
  };

  return BookingSeat;
};
