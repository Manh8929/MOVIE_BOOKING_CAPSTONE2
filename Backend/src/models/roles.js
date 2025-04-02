module.exports = (sequelize, DataTypes) => {
  const Role = sequelize.define("Role", {
    role_id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
    role_name: {
      type: DataTypes.ENUM("admin", "staff", "customer"),
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
  });

  return Role;
};
