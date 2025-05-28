const { Sequelize } = require("sequelize");
const sequelize = new Sequelize("DB_Movie", "root", "sung23", {
  host: "localhost",
  dialect: "mysql",
  logging: false,
});

const connectionDatabase = async () => {
  try {
    await sequelize.authenticate();
    console.log("Connection has been established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
};
console.log("payment_id")
connectionDatabase();