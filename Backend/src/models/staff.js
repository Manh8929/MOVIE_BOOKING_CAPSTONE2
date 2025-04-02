module.exports = (sequelize, DataTypes) => {
  const Staff = sequelize.define("Staff", {
    staff_id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    role_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    theater_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    hire_date: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    salary: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    status: {
      type: DataTypes.ENUM("active", "resigned", "terminated"),
      defaultValue: "active",
    },
    created_at: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
    updated_at: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  });

  Staff.associate = (models) => {
    Staff.belongsTo(models.User, { foreignKey: "user_id" });
    Staff.belongsTo(models.Role, { foreignKey: "role_id" });
    Staff.belongsTo(models.Theater, { foreignKey: "theater_id" });
  };

  return Staff;
};
