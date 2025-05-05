"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("user_promotions", {
      id: {
        type: Sequelize.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
      },
      user_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "users", // Tên bảng users trong cơ sở dữ liệu
          key: "user_id",
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },
      promo_id: {
        type: Sequelize.INTEGER.UNSIGNED,
        allowNull: false,
        references: {
          model: "promotions", // Tên bảng promotions trong cơ sở dữ liệu
          key: "promo_id",
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },
      redeemed: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
      },
      redeemed_at: {
        type: Sequelize.DATE,
        allowNull: true,
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
    await queryInterface.dropTable("user_promotions");
  },
};
