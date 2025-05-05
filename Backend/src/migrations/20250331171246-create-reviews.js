"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("reviews", {
      review_id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
      },
      movie_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "movies", // Tên bảng movies đã tạo
          key: "movie_id", // Khóa chính của bảng movies (điều chỉnh nếu cần)
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },
      user_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "users", // Tên bảng users đã tạo
          key: "user_id", // Khóa chính của bảng users (điều chỉnh nếu cần)
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },
      rating: {
        type: Sequelize.INTEGER,
        allowNull: true,
        validate: {
          min: 1,
          max: 5,
        },
      },
      comment: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      sentiment: {
        type: Sequelize.ENUM("positive", "neutral", "negative"),
        allowNull: false,
      },
      review_time: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
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
    await queryInterface.dropTable("reviews");
  },
};
