module.exports = (sequelize, DataTypes) => {
  const UserActivity = sequelize.define("UserActivity", {
    activity_id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    action: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  });

  UserActivity.associate = (models) => {
    UserActivity.belongsTo(models.User, { foreignKey: "user_id" });
  };

  return UserActivity;
};
