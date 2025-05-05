"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("screens", {
      screen_id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
      },
      theater_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "theaters", // Tên bảng Theater trong database
          key: "theater_id",
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },
      screen_name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      total_seats: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      screen_type: {
        type: Sequelize.ENUM("2D", "3D", "IMAX"),
        allowNull: false,
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
    await queryInterface.dropTable("screens");
  },
};
