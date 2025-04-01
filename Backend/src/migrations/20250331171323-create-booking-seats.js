"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("booking_seats", {
      booking_seat_id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
      },
      booking_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "bookings", // Tên bảng Booking trong database
          key: "booking_id",
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },
      seat_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "seats", // Tên bảng Seat trong database
          key: "seat_id",
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("booking_seats");
  },
};
