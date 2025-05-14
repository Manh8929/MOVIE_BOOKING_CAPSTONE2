module.exports = (sequelize, DataTypes) => {
  const Theater = sequelize.define(
    "Theater",
    {
      theater_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      location: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      contact: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      status: {
        type: DataTypes.ENUM("active", "inactive", "maintenance"),
        defaultValue: "active",
        allowNull: false,
      },
    },
    {
      timestamps: true,
      tableName: "Theaters",
    }
  );
  
  Theater.associate = (models) => {
    Theater.hasMany(models.Screen, { foreignKey: "theater_id" });
  };

  return Theater;
};
