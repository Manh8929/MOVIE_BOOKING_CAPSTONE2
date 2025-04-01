"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("showtimes", {
      showtime_id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
      },
      movie_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "movies", // Tên bảng Movie đã tạo
          key: "movie_id", // Khóa chính của bảng Movie (chú ý nếu model dùng "movie_id")
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },
      screen_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "screens", // Tên bảng Screen đã tạo
          key: "screen_id", // Khóa chính của bảng Screen (nếu sử dụng tên screen_id)
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },
      status: {
        type: Sequelize.ENUM("scheduled", "completed", "canceled"),
        defaultValue: "scheduled",
      },
      show_time: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      ticket_price: {
        type: Sequelize.DECIMAL(10, 2),
        allowNull: false,
      },
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("showtimes");
  },
};
