// module.exports = (sequelize, DataTypes) => {
//   const Screen = sequelize.define("Screen", {
//     screen_id: {
//       type: DataTypes.INTEGER,
//       autoIncrement: true,
//       primaryKey: true,
//       allowNull: false,
//     },
//     theater_id: {
//       type: DataTypes.INTEGER,
//       allowNull: false,
//     },
//     screen_name: {
//       type: DataTypes.STRING,
//       allowNull: false,
//     },
//     total_seats: {
//       type: DataTypes.INTEGER,
//       allowNull: false,
//     },
//     screen_type: {
//       type: DataTypes.ENUM("2D", "3D", "IMAX"),
//       allowNull: false,
//     },
//   });

//   Screen.associate = (models) => {
//     Screen.belongsTo(models.Theater, { foreignKey: "theater_id" });
//   };

//   return Screen;
// };
module.exports = (sequelize, DataTypes) => {
  const Screen = sequelize.define(
    "Screen",
    {
      screen_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
      },
      theater_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      screen_name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      total_seats: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      screen_type: {
        type: DataTypes.ENUM("2D", "3D", "IMAX"),
        allowNull: false,
      },
    },
    {
      timestamps: false, // tắt tự động thêm createdAt/updatedAt
      tableName: "screens",
    }
  );

  Screen.associate = (models) => {
    Screen.belongsTo(models.Theater, { foreignKey: "theater_id" });
    Screen.hasMany(models.Showtime, { foreignKey: "screen_id" }); // liên kết với Showtime
  };

  return Screen;
};
