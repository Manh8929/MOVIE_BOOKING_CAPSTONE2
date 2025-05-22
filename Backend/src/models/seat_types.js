// models/SeatType.js
module.exports = (sequelize, DataTypes) => {
  const SeatType = sequelize.define("SeatType", {
    seat_type_id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.ENUM("regular", "vip", "couple", "disabled"),
      allowNull: false,
      unique: true,
    },
    price: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
  }, {
    tableName: "seat_types",
    timestamps: false,
  });

  SeatType.associate = (models) => {
    SeatType.hasMany(models.Seat, { foreignKey: "seat_type_id" });
  };

  return SeatType;
};
