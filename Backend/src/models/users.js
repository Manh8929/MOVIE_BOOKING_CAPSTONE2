module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    "User",
    {
      user_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
      },
      full_name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      phone_number: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      role_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "Roles",
          key: "role_id",
        },
      },
      avatar: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      dob: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      gender: {
        type: DataTypes.ENUM("male", "female", "other"),
        allowNull: true,
      },
      address: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      provider: {
        type: DataTypes.ENUM("local", "google", "facebook"),
        allowNull: false,
        defaultValue: "local",
      },
      status: {
        type: DataTypes.ENUM("active", "inactive"),
        allowNull: true,
      },
    },
    {
      timestamps: true,
    }
  );

  User.associate = (models) => {
    User.belongsTo(models.Role, { foreignKey: "role_id" });
  };

  return User;
};
