module.exports = (sequelize, DataTypes) => {
  const Payment = sequelize.define("Payment", {
    payment_id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
    booking_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    payment_method: {
      type: DataTypes.ENUM("credit_card", "debit_card", "paypal", "cash"),
      allowNull: false,
    },
    payment_status: {
      type: DataTypes.ENUM("pending", "completed", "failed"),
      allowNull: false,
    },
    amount: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    payment_time: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  });

  Payment.associate = (models) => {
    Payment.belongsTo(models.Booking, { foreignKey: "booking_id" });
    Payment.belongsTo(models.User, { foreignKey: "user_id" });
  };

  return Payment;
};
