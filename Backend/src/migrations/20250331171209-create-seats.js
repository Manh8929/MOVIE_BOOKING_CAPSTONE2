"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("seats", {
      seat_id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
      },
      showtime_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "showtimes", // Tên bảng showtimes đã tạo
          key: "showtime_id", // Khóa chính của bảng showtimes (chú ý nếu bạn sử dụng showtime_id)
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },
      seat_number: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      screen_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "screens", // Tên bảng screens đã tạo
          key: "screen_id", // Khóa chính của bảng screens (nếu sử dụng screen_id)
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },
      seat_type: {
        type: Sequelize.ENUM("regular", "vip", "disabled","couple"),
        allowNull: false,
      },
      price: {
        type: Sequelize.DECIMAL(10, 2),
        allowNull: false,
      },
      is_available: {
        type: Sequelize.BOOLEAN,
        defaultValue: true,
      },
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("seats");
  },
};
