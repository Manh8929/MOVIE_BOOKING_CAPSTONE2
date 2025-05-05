module.exports = (sequelize, DataTypes) => {
  const Booking = sequelize.define("Booking", {
    booking_id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    showtime_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    qr_code: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    total_price: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    status: {
      type: DataTypes.ENUM("pending", "confirmed", "canceled"),
      allowNull: false,
    },
    booking_time: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  },{
    timestamps: true,
  });

  Booking.associate = (models) => {
    Booking.belongsTo(models.User, { foreignKey: "user_id" });
    Booking.belongsTo(models.Showtime, { foreignKey: "showtime_id" });
  };

  return Booking;
};
