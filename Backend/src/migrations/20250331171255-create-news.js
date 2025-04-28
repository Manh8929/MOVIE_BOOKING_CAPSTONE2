"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("news", {
      news_id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
      },
      category: {
        type: Sequelize.ENUM('general', 'specific'),
        allowNull: false,
      },
      movie_id: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: "movies", // Tên bảng Movie đã được tạo
          key: "movie_id", // Khóa chính của bảng Movie (điều chỉnh nếu tên khóa chính khác)
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },
      title: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
      },
      content: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      published_at: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
      },
      image_url: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      },
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("news");
  },
};
