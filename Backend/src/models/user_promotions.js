module.exports = (sequelize, DataTypes) => {
  const UserPromotion = sequelize.define("UserPromotion", {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    promo_id: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
    },
    redeemed: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    redeemed_at: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    created_at: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
      allowNull: false,
    },
    updated_at: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
      allowNull: false,
    },
  });

  UserPromotion.associate = (models) => {
    UserPromotion.belongsTo(models.User, { foreignKey: "user_id" });
    UserPromotion.belongsTo(models.Promotion, { foreignKey: "promo_id" });
  };

  return UserPromotion;
};
