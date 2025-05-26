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
      seat_type_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "seat_types",
          key: "seat_type_id",
        },
        onUpdate: "CASCADE",
        onDelete: "RESTRICT",
      },
      is_available: {
        type: Sequelize.BOOLEAN,
        defaultValue: true,
      },
      createdAt: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW,
      },
      updatedAt: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW,
      },
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("seats");
  },
};
