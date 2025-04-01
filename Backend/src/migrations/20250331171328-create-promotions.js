"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("promotions", {
      promo_id: {
        type: Sequelize.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
      },
      title: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      description: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      image_url: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      code: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true, // Thêm unique nếu bạn muốn mã khuyến mãi là duy nhất
      },
      discount_type: {
        type: Sequelize.ENUM("percentage", "fixed"),
        allowNull: false,
      },
      discount_value: {
        type: Sequelize.DECIMAL(8, 2),
        allowNull: false,
      },
      min_order_value: {
        type: Sequelize.DECIMAL(8, 2),
        allowNull: false,
      },
      max_discount: {
        type: Sequelize.DECIMAL(8, 2),
        allowNull: false,
      },
      valid_from: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      valid_to: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      applicable_movies: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      applicable_payment: {
        type: Sequelize.ENUM("credit_card", "debit_card", "paypal", "cash"),
        allowNull: false,
      },
      usage_limit: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      user_limit: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      used_count: {
        type: Sequelize.INTEGER,
        defaultValue: 0,
      },
      max_users: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      status: {
        type: Sequelize.ENUM("active", "inactive"),
        allowNull: false,
      },
      created_by: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: "users",
          key: "user_id",
        },
        onUpdate: "CASCADE",
        onDelete: "SET NULL",
      },
      created_at: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW,
      },
      updated_at: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW,
      },
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("promotions");
  },
};
